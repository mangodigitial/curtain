import type { Section } from "./types";
import Hero from "./Hero";
import EditorialSplit from "./EditorialSplit";
import Intro from "./Intro";
import RoomGrid from "./RoomGrid";
import RoomDetail from "./RoomDetail";
import GalleryMosaic from "./GalleryMosaic";
import GalleryBand from "./GalleryBand";
import StatsBand from "./StatsBand";
import Timeline from "./Timeline";
import Testimonial from "./Testimonial";
import OfferCard from "./OfferCard";
import WellnessScroll from "./WellnessScroll";
import TreatmentList from "./TreatmentList";
import ExperienceSteps from "./ExperienceSteps";
import IncludedUpgrade from "./IncludedUpgrade";
import ActivitySection from "./ActivitySection";
import FilterGallery from "./FilterGallery";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ExploreCards from "./ExploreCards";
import CTABand from "./CTABand";
import FreeformContent from "./FreeformContent";
import Embed from "./Embed";
import Accordion from "./Accordion";
import Video from "./Video";
import Quote from "./Quote";
import InclusiveStrip from "./InclusiveStrip";
import IntroSplit from "./IntroSplit";
import DetailColumns from "./DetailColumns";
import MapSection from "./MapSection";

function RenderSection({ section, index }: { section: Section; index: number }) {
  switch (section.type) {
    case "hero":
      return <Hero data={section} />;
    case "editorial_split":
      return <EditorialSplit data={section} />;
    case "intro":
      return <Intro data={section} />;
    case "room_grid":
      return <RoomGrid data={section} />;
    case "room_detail":
      return <RoomDetail data={section} />;
    case "gallery_mosaic":
      return <GalleryMosaic data={section} />;
    case "gallery_band":
      return <GalleryBand data={section} />;
    case "stats_band":
      return <StatsBand data={section} />;
    case "timeline":
      return <Timeline data={section} />;
    case "testimonial":
      return <Testimonial data={section} />;
    case "offer_card":
      return <OfferCard data={section} />;
    case "wellness_scroll":
      return <WellnessScroll data={section} />;
    case "treatment_list":
      return <TreatmentList data={section} />;
    case "experience_steps":
      return <ExperienceSteps data={section} />;
    case "included_upgrade":
      return <IncludedUpgrade data={section} />;
    case "activity_section":
      return <ActivitySection data={section} index={index} />;
    case "filter_gallery":
      return <FilterGallery data={section} />;
    case "contact_form":
      return <ContactForm data={section} />;
    case "contact_info":
      return <ContactInfo data={section} />;
    case "explore_cards":
      return <ExploreCards data={section} />;
    case "cta_band":
      return <CTABand data={section} />;
    case "freeform_content":
      return <FreeformContent data={section} />;
    case "embed":
      return <Embed data={section} />;
    case "accordion":
      return <Accordion data={section} />;
    case "video":
      return <Video data={section} />;
    case "quote":
      return <Quote data={section} />;
    case "inclusive_strip":
      return <InclusiveStrip data={section} />;
    case "intro_split":
      return <IntroSplit data={section} />;
    case "detail_columns":
      return <DetailColumns data={section} />;
    case "map_section":
      return <MapSection data={section} />;
    default:
      return null;
  }
}

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((section, index) => (
        <RenderSection key={index} section={section} index={index} />
      ))}
    </>
  );
}
