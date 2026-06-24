import React, { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { submitConsultation } from "../lib/api";
import { FORM } from "../constants/testIds";

export default function ConsultationForm({ compact = false }) {
  const { t } = useLang();
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    target_program: "",
    message: "",
  });

  const onChange = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await submitConsultation({ ...data, source: "consultation_form" });
      toast.success(t("common.sent"));
      setData({ name: "", email: "", phone: "", target_program: "", message: "" });
    } catch (err) {
      toast.error(t("common.error"));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`grid grid-cols-1 ${compact ? "" : "md:grid-cols-2"} gap-x-10 gap-y-6`}
      data-testid="consultation-form"
    >
      <div>
        <label className="ev-label" htmlFor="c-name">{t("forms.name")}</label>
        <input
          id="c-name"
          required
          minLength={2}
          value={data.name}
          onChange={onChange("name")}
          className="ev-input"
          data-testid={FORM.consultName}
        />
      </div>
      <div>
        <label className="ev-label" htmlFor="c-email">{t("forms.email")}</label>
        <input
          id="c-email"
          type="email"
          required
          value={data.email}
          onChange={onChange("email")}
          className="ev-input"
          data-testid={FORM.consultEmail}
        />
      </div>
      <div>
        <label className="ev-label" htmlFor="c-phone">{t("forms.phone")}</label>
        <input
          id="c-phone"
          required
          value={data.phone}
          onChange={onChange("phone")}
          className="ev-input"
          data-testid={FORM.consultPhone}
        />
      </div>
      <div>
        <label className="ev-label" htmlFor="c-program">{t("forms.program")}</label>
        <input
          id="c-program"
          placeholder={t("forms.programPlaceholder")}
          value={data.target_program}
          onChange={onChange("target_program")}
          className="ev-input"
          data-testid={FORM.consultProgram}
        />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="ev-label" htmlFor="c-message">{t("forms.message")}</label>
        <textarea
          id="c-message"
          rows={3}
          placeholder={t("forms.messagePlaceholder")}
          value={data.message}
          onChange={onChange("message")}
          className="ev-textarea"
          data-testid={FORM.consultMessage}
        />
      </div>
      <div className={`flex items-center justify-between gap-4 ${compact ? "" : "md:col-span-2"}`}>
        <p className="text-[12px] text-[#5A5A5A] max-w-md">{t("forms.consent")}</p>
        <button
          type="submit"
          disabled={busy}
          className="ev-btn-accent disabled:opacity-60"
          data-testid={FORM.consultSubmit}
        >
          {busy ? t("common.submitting") : t("nav.primaryCta")}
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}
