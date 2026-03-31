"use client";

import { useEffect, useState, FormEvent } from "react";

interface Redirect {
  id: string;
  fromPath: string;
  toPath: string;
  type: number;
  createdAt: string;
}

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);

  // New redirect form
  const [newFrom, setNewFrom] = useState("");
  const [newTo, setNewTo] = useState("");
  const [newType, setNewType] = useState(301);
  const [adding, setAdding] = useState(false);

  // Inline editing
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFrom, setEditFrom] = useState("");
  const [editTo, setEditTo] = useState("");
  const [editType, setEditType] = useState(301);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchRedirects();
  }, []);

  function fetchRedirects() {
    fetch("/api/redirects")
      .then((res) => res.json())
      .then((data) => setRedirects(data))
      .catch((err) => console.error("Failed to load redirects:", err))
      .finally(() => setLoading(false));
  }

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    if (!newFrom.trim() || !newTo.trim()) return;
    setAdding(true);

    try {
      const res = await fetch("/api/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromPath: newFrom.trim(),
          toPath: newTo.trim(),
          type: newType,
        }),
      });

      if (res.ok) {
        const redirect = await res.json();
        setRedirects((prev) => [redirect, ...prev]);
        setNewFrom("");
        setNewTo("");
        setNewType(301);
      }
    } catch (err) {
      console.error("Failed to add redirect:", err);
    } finally {
      setAdding(false);
    }
  }

  function startEdit(r: Redirect) {
    setEditingId(r.id);
    setEditFrom(r.fromPath);
    setEditTo(r.toPath);
    setEditType(r.type);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/redirects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromPath: editFrom.trim(),
          toPath: editTo.trim(),
          type: editType,
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setRedirects((prev) => prev.map((r) => (r.id === id ? updated : r)));
        setEditingId(null);
      }
    } catch (err) {
      console.error("Failed to update redirect:", err);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this redirect?")) return;

    try {
      const res = await fetch(`/api/redirects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRedirects((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete redirect:", err);
    }
  }

  const inputClass =
    "w-full border border-sand-dark/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-ocean-deep";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-semibold text-text">Redirects</h1>
      </div>

      {/* Add New Redirect */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-sm font-semibold text-text uppercase tracking-wider mb-4">
          Add Redirect
        </h2>
        <form onSubmit={handleAdd} className="flex items-end gap-3">
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-1">From Path</label>
            <input
              type="text"
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              className={inputClass}
              placeholder="/old-path"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-text mb-1">To Path</label>
            <input
              type="text"
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              className={inputClass}
              placeholder="/new-path"
              required
            />
          </div>
          <div className="w-28">
            <label className="block text-sm font-medium text-text mb-1">Type</label>
            <select
              value={newType}
              onChange={(e) => setNewType(Number(e.target.value))}
              className={inputClass}
            >
              <option value={301}>301</option>
              <option value={302}>302</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={adding}
            className="bg-ocean-deep text-white px-4 py-2 rounded text-sm hover:bg-ocean-deep/90 transition disabled:opacity-50 whitespace-nowrap"
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </form>
      </div>

      {/* Redirects Table */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-text-light text-sm">
            Loading redirects...
          </div>
        ) : redirects.length === 0 ? (
          <div className="p-6 text-center text-text-light text-sm">
            No redirects configured.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-sand-dark/20 text-left text-xs uppercase tracking-wider text-text-light">
                <th className="px-6 py-3">From Path</th>
                <th className="px-6 py-3">To Path</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-dark/20">
              {redirects.map((r) => (
                <tr key={r.id} className="hover:bg-sand-light/50 transition">
                  {editingId === r.id ? (
                    <>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={editFrom}
                          onChange={(e) => setEditFrom(e.target.value)}
                          className={inputClass}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          value={editTo}
                          onChange={(e) => setEditTo(e.target.value)}
                          className={inputClass}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <select
                          value={editType}
                          onChange={(e) => setEditType(Number(e.target.value))}
                          className={inputClass}
                        >
                          <option value={301}>301</option>
                          <option value={302}>302</option>
                        </select>
                      </td>
                      <td className="px-6 py-3 text-sm text-text-light">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => saveEdit(r.id)}
                            disabled={saving}
                            className="text-ocean-deep text-sm hover:underline disabled:opacity-50"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-text-light text-sm hover:underline"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-sm font-mono text-text">
                        {r.fromPath}
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-text">
                        {r.toPath}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-sand-dark/10 text-text">
                          {r.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-light">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => startEdit(r)}
                            className="text-ocean-deep text-sm hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="text-red-600 text-sm hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
