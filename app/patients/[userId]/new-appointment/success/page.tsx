import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'

import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/patient.actions';

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || "";
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)
    const user = await getUser(userId);

    // used for tracking the number of users that viewed a page.
    Sentry.metrics.set("user_view_appointment-success", user.name);

    return (
        <main className='flex h-screen max-h-screen px-[5%]'>
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        width={1000}
                        height={1000}
                        alt="logo"
                        className="h-10 w-fit"
                    />
                </Link>

                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        width={280}
                        height={300}
                        alt='success'
                    />
                    <h2 className="header mb-6 text-center max-w-[600px]">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted.
                    </h2>
                    <p>We will be in touch shortly to confirm.</p>
                </section>

                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            width={100}
                            height={100}
                            alt='doctor image'
                            className='size-6'
                        />
                        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            width={24}
                            height={24}
                            alt='calendar'
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant="outline" className="shad-primary-btn" asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment</Link>
                </Button>
                <p className="copyright">© 2024 DocThud</p>
            </div>
        </main>
    )
}

export default Success