import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Datepicker, Dropdown, Modal } from "flowbite-react";
import { Bird, CircleUserRound, MessageCircleWarning } from "lucide-react";
import { useState } from "react";
import { TEChart } from "tw-elements-react";

export default function Dashboard({ auth }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const [filter, setfilter] = useState("Pick Date");

    const handleFilterClick = (filterType) => {
        if (filterType === "Pick Date") {
            setShowDatePicker(true);
        } else {
            setShowDatePicker(false);
            setfilter(filterType);
            console.log(`Filter applied: ${filterType}`);
        }
    };

    function getGreetingBasedOnTime() {
        const currentHour = currentTime.getHours();

        if (currentHour >= 5 && currentHour < 11) {
            return "morning";
        } else if (currentHour >= 11 && currentHour < 15) {
            return "afternoon";
        } else if (currentHour >= 15 && currentHour < 21) {
            return "evening";
        } else {
            return "night";
        }
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className=" pt-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl">
                        Good {getGreetingBasedOnTime()}, {auth.user.name}
                    </h2>
                    <div className="flex space-x-3 justify-end">
                        {/* Date Picker Modal */}
                        {showDatePicker && <Datepicker />}
                        <div className="flex justify-end mb-4 ">
                            <Dropdown label={`Filter: ${filter}`}>
                                <Dropdown.Item
                                    onClick={() =>
                                        handleFilterClick("Pick Date")
                                    }
                                >
                                    Pick Date
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleFilterClick("Monthly")}
                                >
                                    Monthly
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleFilterClick("Week")}
                                >
                                    Week
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => handleFilterClick("Day")}
                                >
                                    Day
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-x-5">
                        <article className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 capitalize">
                                        active users
                                    </p>

                                    <p className="text-lg font-medium text-gray-900">
                                        847
                                    </p>
                                </div>
                                <span className="rounded-full bg-green-100 p-3 text-green-600">
                                    <CircleUserRound />
                                </span>
                            </div>
                        </article>

                        <article className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 capitalize">
                                        Total Chirps
                                    </p>

                                    <p className="text-lg font-medium text-gray-900">
                                        847
                                    </p>
                                </div>

                                <span className="rounded-full bg-gray-100 p-3 text-gray-600">
                                    <Bird />
                                </span>
                            </div>
                        </article>

                        <article className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 capitalize">
                                        violation report
                                    </p>

                                    <p className="text-lg font-medium text-gray-900">
                                        847
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 p-3 text-red-600">
                                    <MessageCircleWarning />
                                </span>
                            </div>
                        </article>
                    </div>

                    <div className="bg-white rounded-lg p-10 border mt-5 mx-auto">
                        <div className=" md:w-3/5 overflow-hidden mx-auto">
                            <TEChart
                                type="line"
                                data={{
                                    labels: [
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                    ],
                                    datasets: [
                                        {
                                            label: "Total Chrips",
                                            backgroundColor: "blue",
                                            data: [
                                                2112, 2343, 2545, 3123, 2365,
                                                1985, 987,
                                            ],
                                        },
                                        {
                                            borderColor: "red",
                                            backgroundColor: "red",
                                            label: "Total Report",
                                            data: [
                                                112, 343, 45, 423, 365, 985, 98,
                                            ],
                                        },
                                    ],
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
