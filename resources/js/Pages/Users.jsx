import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Table, Button, Modal } from "flowbite-react";

export default function Users({ auth, users }) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        role: "",
        status: "",
    });

    const updateUser = (user) => {
        setData({
            role: user.role,
            status: user.status,
        });
        put(route("dashboard.admin.users.update", user.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setDeleteModalOpen(true);
    };

    const deleteUser = () => {
        if (userToDelete) {
            destroy(route("dashboard.admin.users.destroy", userToDelete.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setDeleteModalOpen(false);
                    setUserToDelete(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>Chirps Count</Table.HeadCell>
                                <Table.HeadCell>Role</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {users.map((user) => (
                                    <Table.Row
                                        key={user.id}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {user.name}
                                        </Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            {user.chirps.length}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <select
                                                disabled={
                                                    user.email ===
                                                    auth.user.email
                                                }
                                                value={user.role}
                                                onChange={(e) =>
                                                    updateUser({
                                                        ...user,
                                                        role: e.target.value,
                                                    })
                                                }
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer ${
                                                    user.email ===
                                                        auth.user.email &&
                                                    "!cursor-not-allowed"
                                                }`}
                                            >
                                                <option value="user">
                                                    User
                                                </option>
                                                <option value="moderator">
                                                    Moderator
                                                </option>
                                            </select>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <select
                                                disabled={
                                                    user.email ===
                                                    auth.user.email
                                                }
                                                value={user.status}
                                                onChange={(e) =>
                                                    updateUser({
                                                        ...user,
                                                        status: e.target.value,
                                                    })
                                                }
                                                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer ${
                                                    user.email ===
                                                        auth.user.email &&
                                                    "!cursor-not-allowed"
                                                }`}
                                            >
                                                <option value="active">
                                                    Active
                                                </option>
                                                <option value="banned">
                                                    Banned
                                                </option>
                                            </select>
                                        </Table.Cell>
                                        <Table.Cell>
                                            {user.email !== auth.user.email && (
                                                <Button
                                                    color="failure"
                                                    onClick={() =>
                                                        confirmDelete(user)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>

            <Modal
                show={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
            >
                <Modal.Header>Confirm Deletion</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this user? This
                            action cannot be undone.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="failure" onClick={deleteUser}>
                        Delete
                    </Button>
                    <Button
                        color="gray"
                        onClick={() => setDeleteModalOpen(false)}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </AuthenticatedLayout>
    );
}
