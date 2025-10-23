export default function Features() {
  const features = [
    {
      icon: "🧠",
      title: "Smart System",
      desc: "Automated vote counting with intelligent verification.",
    },
    {
      icon: "🔐",
      title: "Secure Platform",
      desc: "Encrypted data storage ensuring full voter privacy.",
    },
    {
      icon: "📊",
      title: "Transparent Results",
      desc: "Track voting outcomes in real-time without bias.",
    },
  ];

  return (
    <div className="container mx-auto text-center px-6">
      <h2 className="text-3xl font-bold mb-12 text-[var(--foreground)]">
        Key Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition">
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-[var(--muted-foreground)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
