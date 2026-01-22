import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Member } from "@/hooks/useMembers";

interface MemberAutocompleteProps {
  members: Member[];
  value?: string;
  onSelect: (member: Member | null) => void;
  placeholder?: string;
  className?: string;
}

export function MemberAutocomplete({
  members,
  value,
  onSelect,
  placeholder = "Digite o nome do membro...",
  className,
}: MemberAutocompleteProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set initial query from value
  useEffect(() => {
    if (value) {
      const member = members.find(m => m.id === value);
      if (member) {
        setQuery(member.full_name);
      }
    } else {
      setQuery("");
    }
  }, [value, members]);

  // Filter members when query changes
  useEffect(() => {
    if (query.length >= 3) {
      const filtered = members.filter(m =>
        m.full_name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10);
      setFilteredMembers(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredMembers([]);
      setIsOpen(false);
    }
  }, [query, members]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (member: Member) => {
    setQuery(member.full_name);
    onSelect(member);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onSelect(null);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value === "") {
            onSelect(null);
          }
        }}
        placeholder={placeholder}
        className="w-full"
      />
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredMembers.map((member) => (
            <button
              key={member.id}
              type="button"
              className="w-full px-3 py-2 text-left hover:bg-muted transition-colors flex items-center gap-3"
              onClick={() => handleSelect(member)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                {member.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="font-medium text-sm">{member.full_name}</p>
                {member.phone && (
                  <p className="text-xs text-muted-foreground">{member.phone}</p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
      {query && value && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={handleClear}
        >
          ×
        </button>
      )}
    </div>
  );
}
