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
            question: "Is there a free trial?",
            answer: "Yes, you can try Naskai for free with our Starter plan, which includes 5 tasks per day and basic note-taking features.",
        },
        {
            key: "q2",
            question: "How does the AI summarization work?",
            answer: "Our AI analyzes your note's content and extracts the key points, creating a concise summary that saves you reading time.",
        },
        {
            key: "q3",
            question: "Can I convert notes to tasks automatically?",
            answer: "Absolutely! The Task Extraction feature identifies action items within your notes and automatically adds them to your task list.",
        },
        {
            key: "q4",
            question: "Is my data secure?",
            answer: "Security is our top priority. All your notes and tasks are encrypted and stored deeply securely.",
        },
    ];

    return (
        <section id="faq" className="py-24 bg-gray-50 dark:bg-neutral-900/30">
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
