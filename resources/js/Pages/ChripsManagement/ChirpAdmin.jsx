import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm, usePage } from "@inertiajs/react";
import WysiwygEditor from "@/Components/WysiwygEditor";
import { Flag, MessageCircleWarning, Pin } from "lucide-react";

dayjs.extend(relativeTime);

export default function Chirp({ chirp }) {
    console.log(chirp);

    const { auth } = usePage().props;

    const renderMedia = (mediaPath, mediaType) => {
        if (!mediaPath) return null;

        const isImage = mediaType.startsWith("image/");
        const isVideo = mediaType.startsWith("video/");

        if (isImage) {
            return (
                <img
                    src={`/storage/${mediaPath}`}
                    alt="Chirp media"
                    className="max-w-full h-auto mt-4 rounded-lg"
                />
            );
        }

        if (isVideo) {
            return (
                <video controls className="max-w-full h-auto mt-4 rounded-lg">
                    <source src={`/storage/${mediaPath}`} type={mediaType} />
                    Your browser does not support the video tag.
                </video>
            );
        }

        return null;
    };

    return (
        <div className="p-6 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>

            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">{chirp.user.name}</span>
                        <small className="ml-2 text-sm text-gray-600">
                            {dayjs(chirp.created_at).fromNow()}
                        </small>
                        {chirp.created_at !== chirp.updated_at && (
                            <small className="text-sm text-gray-600">
                                {" "}
                                &middot; edited
                            </small>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {chirp.marked === 1 && (
                            <div
                                className={`px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center space-x-2`}
                            >
                                <span>Marked</span> <Pin width={15} />
                            </div>
                        )}
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                {chirp.marked === 1 ? (
                                    <Dropdown.Link
                                        as="button"
                                        href={route(
                                            "dashboard.admin.chirps.mark",
                                            chirp.id
                                        )}
                                        method="put"
                                    >
                                        Remove Mark
                                    </Dropdown.Link>
                                ) : (
                                    <Dropdown.Link
                                        as="button"
                                        href={route(
                                            "dashboard.admin.chirps.mark",
                                            chirp.id
                                        )}
                                        method="put"
                                    >
                                        Mark
                                    </Dropdown.Link>
                                )}
                                <Dropdown.Link
                                    className="text-red-600"
                                    as="button"
                                    href={route("chirps.destroy", chirp.id)}
                                    method="delete"
                                >
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                {/* 
                <div className="w-full flex justify-end">
                    {chirp.marked === 1 && (
                        <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center space-x-2`}
                        >
                            <span>Marked</span> <Pin width={15} />
                        </div>
                    )}
                </div> */}
                <div>
                    <div
                        className="mt-4 text-lg text-gray-900"
                        dangerouslySetInnerHTML={{ __html: chirp.message }}
                    />
                    {chirp.media_path &&
                        renderMedia(chirp.media_path, chirp.media_type)}
                </div>
            </div>
        </div>
    );
}
