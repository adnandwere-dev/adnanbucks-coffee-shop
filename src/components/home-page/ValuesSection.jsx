export default function ValuesSection() {
  const values = [
    {
      icon: "eco",
      title: "Sustainably Sourced",
      desc: "Direct trade relationships ensuring fair wages and environmentally conscious farming practices.",
    },
    {
      icon: "local_fire_department",
      title: "Artisan Roasted",
      desc: "Small-batch roasting profiles developed to highlight the natural flavor notes of each origin.",
    },
    {
      icon: "groups",
      title: "Community First",
      desc: "Our spaces are designed to foster connection, creativity, and moments of pause in a busy world.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-bright dark:bg-surface-container-lowest transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {values.map((v) => (
          <div
            key={v.title}
            className="text-center space-y-5 p-8 rounded-2xl hover:bg-surface-container-low transition-colors duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-primary-fixed rounded-full flex items-center justify-center text-primary-container mb-2">
              <span className="material-symbols-outlined text-2xl">{v.icon}</span>
            </div>
            <h3 className="font-headline text-xl text-primary font-bold">{v.title}</h3>
            <p className="font-body text-base text-on-surface-variant leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}