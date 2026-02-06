import React from 'react';

export default function LegalPage() {
    return (
        <div className="container mx-auto px-4 pt-32 pb-16 max-w-4xl">
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Legal & Compliance</h1>

            <div className="space-y-8 text-gray-700 dark:text-gray-300">
                <section className="p-0">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Educational Project Disclaimer</h2>
                    <p className="mb-4">
                        Naskai is an <strong>educational project</strong> created for learning and demonstration purposes. It is not intended for production usage in critical environments.
                    </p>
                </section>

                <section className="p-0">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">AI Technology</h2>
                    <p className="mb-4">
                        This application utilizes powerful AI models provided by <a href="https://groq.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Groq</a>.
                    </p>
                    <p>
                        Please note that AI-generated content (summaries, tasks) is probabilistic and may contain errors. Users should verify all information independently.
                    </p>
                </section>

                <section className="p-0">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">No Warranties</h2>
                    <p className="mb-4">
                        The service is provided "as is". We explicitly disclaim any responsibility for data security, persistence, or uptime. Do not store sensitive personal or financial information in this application.
                    </p>
                </section>

                <section className="mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800">
                    <p className="text-sm">
                        Contact: <a href="mailto:tutmurattut@gmail.com" className="text-blue-600 hover:underline">tutmurattut@gmail.com</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
