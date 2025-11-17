export default function AdditionalResources() {
  return (
    <section id="why-ntb" className="py-16 sm:py-24 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
            Heart of NTB
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Why Choose Nick Tech Bytes?
            </span>
          </h3>
          <p className="text-gray-400 mt-3 max-w-3xl mx-auto text-lg">
            Bite-sized clarity for big interviews. Learn the way real engineers
            talk—no fluff, no gatekeeping, just guided momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            emoji="📚"
            title="Simplified Explanations"
            text="Complex concepts broken into everyday analogies so you can retell them during interviews without memorizing scripts."
            gradient="from-cyan-500/10 to-blue-600/10 border-cyan-500/30"
          />
          <Card
            emoji="💻"
            title="Practical Code Examples"
            text="Clean snippets with notes on performance, trade-offs, and how to extend them—perfect for live coding or whiteboard moments."
            gradient="from-purple-500/10 to-pink-600/10 border-purple-500/30"
          />
          <Card
            emoji="🎯"
            title="Interview-Focused"
            text="Curated prompts inspired by FAANG and startup loops, grouped by intent (conceptual, scenario, code) for targeted practice."
            gradient="from-blue-500/10 to-cyan-600/10 border-blue-500/30"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EmotionCard
            emoji="😰"
            title="Scared of Interviews?"
            accent="text-yellow-400"
            border="border-yellow-500/30 hover:border-yellow-500/60"
            text="Trust me, I’ve felt that knot in the stomach minutes before a panel. These walkthroughs were written to calm nerves and build real confidence."
            highlight="Good news: you’re not alone. We’ll untangle each topic together."
          />
          <EmotionCard
            emoji="🚀"
            title="Overwhelmed by Resources?"
            accent="text-cyan-400"
            border="border-cyan-500/30 hover:border-cyan-500/60"
            text="Too many tabs, conflicting advice, zero context? Same. NTB distills the essentials into a single guided path."
            highlight="Solution: one hub for code, context, and next steps."
          />
          <EmotionCard
            emoji="⏰"
            title="2 AM Panic Sessions?"
            accent="text-pink-400"
            border="border-pink-500/30 hover:border-pink-500/60"
            text="Those late-night ‘do I even know this?’ spirals birthed this project. Each section is the explanation I wish I had when I was stuck at 2 AM."
            highlight="Read it, breathe, try again. The story sticks because it’s real."
          />
          <EmotionCard
            emoji="🤝"
            title="We’re A Community"
            accent="text-green-400"
            border="border-green-500/30 hover:border-green-500/60"
            text="Nick Tech Bytes is built with input from peers who share wins, rejections, and aha moments."
            highlight="We learn together, celebrate together, and ship together."
          />
        </div>
      </div>
    </section>
  );
}

type CardProps = {
  emoji: string;
  title: string;
  text: string;
  gradient: string;
};

const Card = ({ emoji, title, text, gradient }: CardProps) => (
  <div
    className={`bg-gradient-to-br ${gradient} rounded-xl p-8 border hover:scale-105 transition-all duration-300`}
  >
    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto text-3xl">
      {emoji}
    </div>
    <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
    <p className="text-gray-300 text-center">{text}</p>
  </div>
);

type EmotionCardProps = {
  emoji: string;
  title: string;
  accent: string;
  border: string;
  text: string;
  highlight: string;
};

const EmotionCard = ({
  emoji,
  title,
  accent,
  border,
  text,
  highlight,
}: EmotionCardProps) => (
  <div
    className={`bg-gray-800/40 backdrop-blur-sm border-2 ${border} rounded-2xl p-8 transition-all duration-300`}
  >
    <div className="flex items-start space-x-4">
      <div className="text-5xl flex-shrink-0">{emoji}</div>
      <div>
        <h3 className={`text-2xl font-bold ${accent} mb-3`}>{title}</h3>
        <p className="text-gray-300 mb-4">{text}</p>
        <p className="text-gray-300">
          <span className="text-cyan-400 font-semibold">Remember:</span>{" "}
          {highlight}
        </p>
      </div>
    </div>
  </div>
);
