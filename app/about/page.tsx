import Testimonials from '@/components/Testimonials'
import StatsSplit from '@/components/StatsSplit'
import TeamSection from '@/components/TeamSection'
import FAQ from '@/components/FAQ'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import { Button } from '@/components/ui/button'

export default function About() {
    const stats = [
        { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
        { id: 2, name: 'Assets under holding', value: '$119 trillion' },
        { id: 3, name: 'New users annually', value: '46,000' },
    ]
    return (
        <>
            <StatsSplit />

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                        {stats.map((stat, index) => (
                            <AnimatedWrapper key={stat.id} delay={index / 5}>
                                <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                    <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                        {stat.value}
                                    </dd>
                                </div>
                            </AnimatedWrapper>
                        ))}
                    </dl>
                </div>
            </div>

            <TeamSection />

            <Testimonials />

            <FAQ />
        </>
    )
}