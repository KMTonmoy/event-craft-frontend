"use client";
import { useEffect, useState } from "react";
import GetUserEmail from "@/hooks/GetUserEmail";
import Swal from "sweetalert2";

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  creator_id: string;
}

interface Application {
  id: string;
  status: string;
  event: Event;
}

interface User {
  id: string;
  email: string;
}

const ManageApplication = () => {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const userEmail = GetUserEmail();

  useEffect(() => {
    if (userEmail) {
      fetch(
        `https://event-craft-serv.vercel.app/api/v1/users/users/${userEmail}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userEmail]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(
        `https://event-craft-serv.vercel.app/api/v1/participant/participations?user_id=${user.id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setApplications(data.data);
            setFilteredApplications(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching applications:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
    if (status) {
      setFilteredApplications(
        applications.filter((app) => app.status === status)
      );
    } else {
      setFilteredApplications(applications);
    }
  };

  const handleUpdateParticipation = (id: string, status: string) => {
    fetch(
      `https://event-craft-serv.vercel.app/api/v1/participant/participations/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((updatedData) => {
        if (updatedData.success) {
          setFilteredApplications(
            filteredApplications.map((app) =>
              app.id === id ? { ...app, status: updatedData.data.status } : app
            )
          );
          Swal.fire({
            title: "Success!",
            text: `Participation status updated to ${updatedData.data.status}`,
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          console.error("Failed to update participation");
        }
      })
      .catch((error) => {
        console.error("Error updating participation:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to update participation status.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleDeleteParticipation = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://event-craft-serv.vercel.app/api/v1/participant/participations/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() => {
            setFilteredApplications(
              filteredApplications.filter((app) => app.id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "The participation has been deleted.",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((error) => {
            console.error("Error deleting participation:", error);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete participation.",
              icon: "error",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  if (!user) return <p>Loading user data...</p>;
  if (loading) return <p>Loading applications...</p>;

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-indigo-700">
          Manage Applications
        </h1>
        <div>
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md"
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="min-w-full table-auto">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Event Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="border-t border-gray-300">
                <td className="py-3 px-4">{app.event.title}</td>
                <td className="py-3 px-4">{app.event.category}</td>
                <td className="py-3 px-4">{app.status}</td>
                <td className="py-3 px-4 flex space-x-2">
                  {user.id === app.event.creator_id &&
                    app.status !== "ACCEPTED" &&
                    app.status !== "REJECTED" && (
                      <>
                        <button
                          onClick={() =>
                            handleUpdateParticipation(app.id, "ACCEPTED")
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateParticipation(app.id, "REJECTED")
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  {user.id === app.event.creator_id && (
                    <button
                      onClick={() => handleDeleteParticipation(app.id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageApplication;
