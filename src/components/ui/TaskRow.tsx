import Avatar from './Avatar';
import { LucideIcon } from 'lucide-react';

interface TaskRowProps {
  iconBg: string;
  iconColor: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  avatars: string[];
}

const avatarPalette = ['bg-blue-500', 'bg-rose-500', 'bg-emerald-500', 'bg-purple-500', 'bg-orange-500'];

export default function TaskRow({ iconBg, iconColor, icon: Icon, title, desc, avatars }: TaskRowProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className={`${iconBg} flex h-12 w-12 items-center justify-center rounded-3xl`}>
          <Icon className={iconColor} size={22} />
        </div>
        <div>
          <h4 className="text-base font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-sm text-slate-500">{desc}</p>
        </div>
      </div>

      <div className="flex -space-x-3">
        {avatars.map((initial, index) => (
          <Avatar key={index} initials={initial} color={avatarPalette[index % avatarPalette.length]} />
        ))}
      </div>
    </div>
  );
}
