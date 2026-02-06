"use client";

import { FaCheck } from "react-icons/fa6";
import Link from "next/link";

const FeatureItem = ({ text }: { text: string }) => (
    <div className="py-2 flex gap-3 items-center">
        <div className="shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <FaCheck className="w-3 h-3 text-green-600 dark:text-green-400" />
        </div>
        <span className="text-gray-700 dark:text-gray-300 text-sm">{text}</span>
    </div>
);

export const Pricing = () => {
    return (
        <section id="pricing" className="py-24 bg-white dark:bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-6">
                    <h2 className="text-3xl font-bold tracking-wide text-blue-600 uppercase mb-2">Pricing</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Simple, transparent pricing
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Start for free, upgrade when you need more power.
                    </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-12 max-w-3xl mx-auto text-center">
                    <p className="text-yellow-800 dark:text-yellow-200 text-sm font-medium">
                        ⚠️ Important Notice: Naskai is an educational project. All plans below are for demonstration purposes only. No actual payments will be processed.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-gray-200 dark:border-neutral-700 flex flex-col">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Starter</h4>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$0</span>
                            <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">Perfect for personal use and testing.</p>
                        <Link
                            href="/signup"
                            className="w-full block text-center py-3 px-4 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-neutral-800 transition-colors mb-8"
                        >
                            Get Started
                        </Link>
                        <div className="space-y-2 grow">
                            <FeatureItem text="5 tasks per day" />
                            <FeatureItem text="Basic Note Taking" />
                            <FeatureItem text="3 AI Summaries/month" />
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border-2 border-blue-600 shadow-xl relative flex flex-col transform md:-translate-y-4">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                            POPULAR
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Pro</h4>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$1</span>
                            <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">For power users who need more organization.</p>
                        <Link
                            href="/signup"
                            className="w-full block text-center py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors mb-8"
                        >
                            Start Free Trial
                        </Link>
                        <div className="space-y-2 grow">
                            <FeatureItem text="Unlimited tasks" />
                            <FeatureItem text="Unlimited Notes" />
                            <FeatureItem text="50 AI Actions/month" />
                            <FeatureItem text="Priority Support" />
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-gray-200 dark:border-neutral-700 flex flex-col">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h4>
                        <div className="flex items-baseline mb-6">
                            <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$5</span>
                            <span className="ml-2 text-gray-500 dark:text-gray-400">/month</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">For teams and heavy workloads.</p>
                        <Link
                            href="/contact"
                            className="w-full block text-center py-3 px-4 rounded-lg border border-gray-200 dark:border-neutral-600 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors mb-8"
                        >
                            Contact Sales
                        </Link>
                        <div className="space-y-2 grow">
                            <FeatureItem text="Everything in Pro" />
                            <FeatureItem text="Unlimited AI" />
                            <FeatureItem text="Team Collaboration" />
                            <FeatureItem text="API Access" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
