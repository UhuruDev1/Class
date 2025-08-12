"use client"

import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
          <Globe className="w-4 h-4 mr-2" />
          {language === "en" ? "EN" : "SW"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
        <DropdownMenuItem onClick={() => setLanguage("en")} className="text-white hover:bg-slate-700 cursor-pointer">
          🇺🇸 {t("common.english")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("sw")} className="text-white hover:bg-slate-700 cursor-pointer">
          🇹🇿 {t("common.swahili")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
