import { Table, Button, Modal, TextInput, Select, Alert } from "flowbite-react";

export default function ChripsReport({ reports }) {
    return (
        <Table striped className="border">
            <Table.Head>
                <Table.HeadCell>Chirp</Table.HeadCell>
                <Table.HeadCell>Reason</Table.HeadCell>
                <Table.HeadCell>Detail</Table.HeadCell>
                <Table.HeadCell>Reporter</Table.HeadCell>
                {/* <Table.HeadCell>Chirps Count</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell> */}
            </Table.Head>
            <Table.Body className="divide-y">
                {reports.map((data) => (
                    <Table.Row
                        key={data.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                        <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white !italic flex flex-wrap">
                            {`"`}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: data.reported.message,
                                }}
                            />
                            {`"`}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white">
                            {data.reason}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white">
                            {data.detail}
                        </Table.Cell>
                        <Table.Cell className="whitespace-nowrap  text-gray-900 dark:text-white">
                            {data.reporter.email} {`(${data.reporter.name})`}
                        </Table.Cell>
                        {/* <Table.Cell>{data.email}</Table.Cell>
                            <Table.Cell>{data.chirps.length}</Table.Cell>
                            <Table.Cell>{data.role}</Table.Cell>
                            <Table.Cell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        data.status === "active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {data.status}
                                </span>
                            </Table.Cell> 
                                <Table.Cell>
                                    <div className="flex space-x-2">
                                        <Button
                                            color="info"
                                            size="sm"
                                            onClick={() => handleEdit(user)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </Button>
                                        <Button
                                            color="failure"
                                            size="sm"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            <Trash className="mr-2 h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </Table.Cell>
                                */}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
}
