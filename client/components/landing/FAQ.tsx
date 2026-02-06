"use client";

import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export const FAQ = () => {
    const [expanded, setExpanded] = useState<string[]>([]);

    const toggleAccordion = (panel: string) => {
        setExpanded((prevExpanded) =>
            prevExpanded.includes(panel)
                ? prevExpanded.filter((item) => item !== panel)
                : [...prevExpanded, panel],
        );
    };

    const faqItems = [
        {
            key: "q1",
            question: "Is Naskai really free?",
            answer: "Yes! Currently, Naskai is an open-access educational project. You can use all features without any cost.",
        },
        {
            key: "q2",
            question: "How does the AI summarization work?",
            answer: "We use Groq's high-performance AI models to analyze your note's content and generate concise summaries instantly.",
        },
        {
            key: "q3",
            question: "Is this a commercial product?",
            answer: "No, Naskai is built for demonstration and learning purposes. It serves as a portfolio piece showcasing modern web technologies.",
        },
        {
            key: "q4",
            question: "Is my data secure?",
            answer: "While we implement standard security practices, please do not store sensitive personal or financial information as this is a demonstration environment.",
        },
    ];

    return (
        <section id="faq" className="py-24 bg-white dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold tracking-wide text-blue-600 uppercase mb-2">Support</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h3>
                </div>

                <div className="max-w-3xl mx-auto flex flex-col gap-4">
                    {faqItems.map((item) => {
                        const isPanelOpen = expanded.includes(item.key);

                        return (
                            <div
                                key={item.key}
                                className="border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                            >
                                <button
                                    onClick={() => toggleAccordion(item.key)}
                                    className="w-full h-auto min-h-12 flex justify-between items-center p-6 text-left focus:outline-none"
                                    aria-expanded={isPanelOpen}
                                >
                                    <span className="font-semibold text-lg text-gray-900 dark:text-gray-100 pr-4">
                                        {item.question}
                                    </span>
                                    <MdKeyboardArrowDown
                                        size={24}
                                        className={`text-gray-500 transform transition-transform duration-300 shrink-0 ${isPanelOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${isPanelOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
