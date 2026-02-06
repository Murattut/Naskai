"use client";
import { FaRegLightbulb, FaClipboardList, FaMagic } from "react-icons/fa"; // Fallback to standard fa

export const Features = () => {
    const features = [
        {
            icon: <FaRegLightbulb className="w-8 h-8 text-blue-600" />,
            title: "Smart Summarization",
            description: "Instantly condense long notes into concise summaries using advanced AI.",
        },
        {
            icon: <FaClipboardList className="w-8 h-8 text-blue-600" />,
            title: "Task Management",
            description: "Organize your daily to-dos efficiently with a clean and intuitive interface.",
        },
        {
            icon: <FaMagic className="w-8 h-8 text-blue-600" />,
            title: "AI Rewrite",
            description: "Enhance your writing clarity and tone with a single click.",
        },
    ];

    return (
        <section id="features" className="py-24 bg-white dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-3xl font-bold tracking-wide text-blue-600 uppercase mb-2">Features</h1>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Supercharge your productivity
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Everything you need to manage your work, enhanced by artificial intelligence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-neutral-700"
                        >
                            <div className="bg-gray-100 dark:bg-neutral-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
