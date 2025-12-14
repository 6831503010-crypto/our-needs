import BackButton from '@/Components/BackButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const groupOrder = ['quizzes', 'events', 'users', 'roles', 'permissions', 'assignments', 'courses', 'other'];
const labelMap = {
  quizzes: 'Quizzes',
  events: 'Events',
  users: 'Users',
  roles: 'Roles',
  permissions: 'Permissions',
  assignments: 'Assignments',
  courses: 'Courses',
  other: 'Other',
};

const getGroupKey = (permName) => {
  const parts = permName.trim().toLowerCase().split(/\s+/);
  const last = parts[parts.length - 1] || 'other';

  if (last === 'attempts' || last === 'attempt') return 'quizzes';
  if (last === 'students' || last === 'teachers') return 'users';

  return last;
};

export default function Create({ permissions = [], default_guard = 'web' }) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    guard_name: default_guard,
    permissions: [],
  });

  const [search, setSearch] = useState('');

  const selectedPermissions = Array.isArray(data.permissions) ? data.permissions : [];
  const permissionsEmpty = selectedPermissions.length === 0;

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = !q
      ? permissions
      : permissions.filter((p) => p.name.toLowerCase().includes(q));

    const map = filtered.reduce((acc, p) => {
      const key = getGroupKey(p.name);
      acc[key] = acc[key] || [];
      acc[key].push(p);
      return acc;
    }, {});

    Object.keys(map).forEach((k) => map[k].sort((a, b) => a.name.localeCompare(b.name)));

    const keys = Object.keys(map);
    keys.sort((a, b) => {
      const ai = groupOrder.indexOf(a);
      const bi = groupOrder.indexOf(b);
      const aRank = ai === -1 ? 999 : ai;
      const bRank = bi === -1 ? 999 : bi;
      if (aRank !== bRank) return aRank - bRank;
      return a.localeCompare(b);
    });

    return { keys, map };
  }, [permissions, search]);

  const togglePermission = (permissionName) => {
    const selected = Array.isArray(data.permissions) ? data.permissions : [];
    setData(
      'permissions',
      selected.includes(permissionName)
        ? selected.filter((p) => p !== permissionName)
        : [...selected, permissionName]
    );
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('admin.roles.store'), { preserveScroll: true });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800">Create Role</h2>
                  <BackButton href={route("admin.roles.index")} />
        </div>
      }
    >
      <Head title="Create Role" />

      <div className="py-6">
        <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <form onSubmit={submit} className="p-6 space-y-8">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Role name</label>
                <input
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-indigo-200"
                  placeholder="e.g. moderator"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Guard */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Guard</label>
                <input
                  value={data.guard_name}
                  onChange={(e) => setData('guard_name', e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-indigo-200"
                  placeholder="web"
                />
                {errors.guard_name && <p className="mt-2 text-sm text-red-600">{errors.guard_name}</p>}
              </div>

              {/* Permissions */}
              <div>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Permissions</div>
                    <p className="text-xs text-gray-500">Pick what this role can do.</p>
                  </div>

                  <div className="text-xs text-gray-500">
                    Selected: <span className="font-semibold">{selectedPermissions.length}</span>
                  </div>
                </div>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search permissions..."
                  className="mt-3 w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-indigo-200"
                />

                {/*For Live validation (no submit needed) */}
                {permissionsEmpty && (
                  <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                    Please select at least one permission.
                  </div>
                )}

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {grouped.keys.map((groupKey) => (
                    <div key={groupKey} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="mb-3 text-base font-semibold text-purple-600">
                        {labelMap[groupKey] ?? groupKey}
                      </div>

                      <div className="space-y-2">
                        {grouped.map[groupKey].map((p) => (
                          <label key={p.id} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={selectedPermissions.includes(p.name)}
                              onChange={() => togglePermission(p.name)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="truncate">{p.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Server-side validation fallback */}
                {errors.permissions && <p className="mt-2 text-sm text-red-600">{errors.permissions}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3">
                <Link
                  href={route('admin.roles.index')}
                  className="rounded-md px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={processing || permissionsEmpty}
                  className="
                    rounded-md bg-gradient-to-r from-indigo-600 to-purple-600
                    px-4 py-2 text-sm font-semibold text-white shadow
                    hover:from-indigo-500 hover:to-purple-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition
                  "
                >
                  {processing ? 'Creating...' : 'Create Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
