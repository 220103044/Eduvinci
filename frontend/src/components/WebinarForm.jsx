import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { submitWebinarRegistration } from "../lib/api";
import { FORM } from "../constants/testIds";

export default function WebinarForm({ eventSlug = "imat-2026" }) {
  const { t } = useLang();
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState({ name: "", email: "", phone: "", target_program: "" });
  const onChange = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await submitWebinarRegistration({ ...data, event_slug: eventSlug });
      toast.success(t("common.sent"));
      setData({ name: "", email: "", phone: "", target_program: "" });
    } catch {
      toast.error(t("common.error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6" data-testid="webinar-form">
      <div>
        <label className="ev-label">{t("forms.name")}</label>
        <input required value={data.name} onChange={onChange("name")} className="ev-input" data-testid={FORM.webinarName} />
      </div>
      <div>
        <label className="ev-label">{t("forms.email")}</label>
        <input type="email" required value={data.email} onChange={onChange("email")} className="ev-input" data-testid={FORM.webinarEmail} />
      </div>
      <div>
        <label className="ev-label">{t("forms.phone")}</label>
        <input required value={data.phone} onChange={onChange("phone")} className="ev-input" data-testid={FORM.webinarPhone} />
      </div>
      <div>
        <label className="ev-label">{t("forms.program")}</label>
        <input
          placeholder={t("forms.programPlaceholder")}
          value={data.target_program}
          onChange={onChange("target_program")}
          className="ev-input"
          data-testid={FORM.webinarProgram}
        />
      </div>
      <div className="md:col-span-2 flex items-center justify-between gap-4">
        <p className="text-[12px] text-[#5A5A5A] max-w-md">{t("forms.consent")}</p>
        <button type="submit" disabled={busy} className="ev-btn-primary disabled:opacity-60" data-testid={FORM.webinarSubmit}>
          {busy ? t("common.submitting") : t("webinarTeaser.cta")}
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
