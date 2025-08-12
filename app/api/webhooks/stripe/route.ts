import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import { headers } from "next/headers"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get("stripe-signature")!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createClient()

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        const { course_id, user_id } = session.metadata

        if (course_id && user_id) {
          // Create enrollment
          const { error: enrollmentError } = await supabase.from("enrollments").insert({
            user_id,
            course_id,
            enrolled_at: new Date().toISOString(),
          })

          if (enrollmentError) {
            console.error("Error creating enrollment:", enrollmentError)
          }

          // Update user subscription status if this was a premium course
          const { data: course } = await supabase.from("courses").select("price").eq("id", course_id).single()

          if (course && course.price >= 100) {
            // Consider courses $100+ as premium
            await supabase.from("profiles").update({ subscription_status: "premium" }).eq("id", user_id)
          }
        }
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object
        const customerId = subscription.customer

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (profile) {
          const status = subscription.status === "active" ? "premium" : "free"
          await supabase.from("profiles").update({ subscription_status: status }).eq("id", profile.id)
        }
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        const customerId = subscription.customer

        // Get user by Stripe customer ID
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single()

        if (profile) {
          await supabase.from("profiles").update({ subscription_status: "free" }).eq("id", profile.id)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
