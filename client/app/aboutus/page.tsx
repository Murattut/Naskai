import React from 'react';

export default function AboutUsPage() {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">About Us</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">The Project</h2>
                    <p className="leading-relaxed">
                        Naskai is developed as an <strong>educational initiative</strong> to explore the capabilities of modern web frameworks and Artificial Intelligence.
                        It demonstrates the integration of Next.js, SQLite, and Groq AI to create a seamless productivity tool.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Our Goal</h2>
                    <p className="leading-relaxed">
                        The primary goal of Naskai is to showcase how AI can assist in everyday workflows, transforming unstructured notes into actionable tasks.
                        While fully functional, it serves primarily as a portfolio piece and a learning resource.
                    </p>
                </section>

                <section className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800">
                    <p className="text-sm">
                        Developer Contact: <a href="mailto:tutmurattut@gmail.com" className="text-blue-600 hover:underline">tutmurattut@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
