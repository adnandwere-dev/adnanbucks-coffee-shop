import Image from "next/image";
export default function StorySection() {
  return (
    <section className="py-32 relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          fill
          src={"/images/home-page/story.png"}
          alt="Roastery Process"
          className="w-full h-full object-cover dark:opacity-60"
        />
        <div className="absolute inset-0 bg-primary/40 dark:bg-black/60"></div>
      </div>
      <div className="relative z-10 px-4 w-full max-w-7xl mx-auto">
        <div className="glass-panel p-10 md:p-16 rounded-2xl max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-headline text-3xl md:text-5xl text-primary font-bold">
            The Roastery Story
          </h2>
          <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
            Born from a passion for the perfect extraction, AdnanBucks began as
            a small experiment. Today, we source the top 1% of beans globally,
            roasting them in-house to unlock their unique terroir.
          </p>
          <p className="font-headline text-xl text-primary italic font-medium pt-4 border-t border-outline-variant/30">
            &ldquo;We believe every cup should tell the story of its origin.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}