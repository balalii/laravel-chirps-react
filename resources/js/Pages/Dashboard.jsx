import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Datepicker, Dropdown, Modal } from "flowbite-react";
import { Bird, CircleUserRound, MessageCircleWarning } from "lucide-react";
import { useState } from "react";

async function getData(filter) {
    const resp = await fetch(
        route("dashboard.getdata", filter ? { filter: filter } : {})
    );
    return await resp.json();
}
export default function Dashboard({ auth, users, chirps, reports }) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    const [filter, setfilter] = useState("Pick Date");
    const [filterData, setFilterData] = useState({
        users: users || 0,
        chirps: chirps || 0,
        reports: reports || 0,
    });
    const handleFilterClick = (filterType) => {
        setfilter(filterType || "None");
        if (filterType === "Pick Date") {
            setShowDatePicker(true);
        } else {
            setShowDatePicker(false);
            getData(filterType).then((v) => setFilterData(v));
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
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="font-medium text-lg">
                        Good {getGreetingBasedOnTime()}, {auth.user.name}
                    </h2>
                    <div className="flex space-x-3 justify-end">
                        {/* Date Picker Modal */}
                        {showDatePicker && (
                            <Datepicker
                                onChange={(dt) => {
                                    getData(dt.toLocaleDateString()).then((v) =>
                                        setFilterData(v)
                                    );
                                }}
                            />
                        )}
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
                                    onClick={() => handleFilterClick("Month")}
                                >
                                    Month
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
                                <Dropdown.Item
                                    onClick={() => handleFilterClick(null)}
                                >
                                    None
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
                                        {filterData.users}
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
                                        {filterData.chirps}
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
                                        {filterData.reports}
                                    </p>
                                </div>

                                <span className="rounded-full bg-red-100 p-3 text-red-600">
                                    <MessageCircleWarning />
                                </span>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
