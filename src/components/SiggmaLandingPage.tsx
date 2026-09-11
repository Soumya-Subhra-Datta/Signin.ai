import { LandingPageFrame, type LandingPageProps } from "./threeui/LandingPageFrame";

export type SiggmaLandingPageProps = LandingPageProps;

export function SiggmaLandingPage(props: SiggmaLandingPageProps) {
  return <LandingPageFrame {...props} title="siggma.ai — AI-powered sales support" sourceUrl="/landing-pages/siggma-ai.html" />;
}