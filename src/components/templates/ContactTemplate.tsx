import Image from "next/image";
import type { Section } from "@/components/sections/types";
import type {
  HeroSection,
  ContactFormSection,
  ContactInfoSection,
} from "@/components/sections/types";
import { renderTitle } from "@/components/sections/render-title";
import ContactForm from "@/components/sections/ContactForm";
import ContactInfo from "@/components/sections/ContactInfo";

/* ─── Helpers ─────────────────────────────────────────────── */

function blurProps(blur?: string) {
  return blur ? { placeholder: "blur" as const, blurDataURL: blur } : {};
}

/* ─── Props ───────────────────────────────────────────────── */

interface ContactTemplateProps {
  sections: Section[];
}

/* ═══════════════════════════════════════════════════════════
   ContactTemplate
   ─────────────────────────────────────────────────────────
   sections[0] = hero          (contact-hero)
   sections[1] = contact_form  (form-card, left column)
   sections[2] = contact_info  (info-panel, right column)
   ═══════════════════════════════════════════════════════════ */

export default function ContactTemplate({ sections }: ContactTemplateProps) {
  const safeSections = sections ?? [];
  const hero = safeSections.find(s => s?.type === 'hero') as HeroSection | undefined;
  const formData = safeSections.find(s => s?.type === 'contact_form') as ContactFormSection | undefined;
  const infoData = safeSections.find(s => s?.type === 'contact_info') as ContactInfoSection | undefined;

  return (
    <>
      {/* ═══ HERO ═══ */}
      {hero && <ContactHero data={hero} />}

      {/* ═══ MAIN SPLIT: form + info ═══ */}
      <div className="contact-main">
        {formData && <ContactForm data={formData} />}
        {infoData && <ContactInfo data={infoData} />}
      </div>
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────
   Template: curtain-bluff-contact.html

   <section class="contact-hero">
     <img class="contact-hero-img" src="..." alt="...">
     <div class="contact-hero-content">
       <h1>Get in <em>Touch</em></h1>
       <p>We'd love to hear from you</p>
     </div>
   </section>
──────────────────────────────────────────────────────────── */

function ContactHero({ data }: { data: HeroSection }) {
  return (
    <section className="contact-hero">
      <Image
        className="contact-hero-img"
        src={data?.image?.url ?? ""}
        alt={data?.image?.alt ?? ""}
        fill
        priority
        sizes="100vw"
        {...blurProps(data?.image?.blurhash)}
      />
      <div className="contact-hero-content">
        <h1>{renderTitle(data?.title, data?.titleItalic, "")}</h1>
        {data?.subtitle && <p>{data.subtitle}</p>}
      </div>
    </section>
  );
}
