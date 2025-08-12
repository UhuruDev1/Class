"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, ShoppingCart } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { getStripePublishableKey } from "@/lib/stripe"

interface EnrollButtonProps {
  courseId: string
  price: number
}

export default function EnrollButton({ courseId, price }: EnrollButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleEnroll() {
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      if (price === 0) {
        // Free course - enroll directly
        const { error } = await supabase.from("enrollments").insert({
          user_id: user.id,
          course_id: courseId,
        })

        if (error) {
          console.error("Enrollment error:", error)
          return
        }

        router.refresh()
      } else {
        // Paid course - create Stripe checkout session
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId }),
        })

        const { sessionId, error } = await response.json()

        if (error) {
          console.error("Checkout error:", error)
          return
        }

        // Redirect to Stripe Checkout
        const stripe = await loadStripe(getStripePublishableKey())
        if (stripe) {
          const { error: stripeError } = await stripe.redirectToCheckout({
            sessionId,
          })

          if (stripeError) {
            console.error("Stripe redirect error:", stripeError)
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {price === 0 ? "Enrolling..." : "Processing..."}
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {price === 0 ? "Enroll for Free" : `Enroll for $${price}`}
        </>
      )}
    </Button>
  )
}
