type Ex = { name: string; sets: string; reps: string; rest: string; note: string };

export function ExerciseTable({
    rows,
    nameHeader = "Ejercicio",
    repsHeader = "Reps",
}: {
    rows: Ex[];
    nameHeader?: string;
    repsHeader?: string;
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-140 table-fixed border-collapse mt-1">
                <thead>
                    <tr>
                        <th className={`font-sans w-[34%] text-left text-[11.5px] sm:text-[13px] uppercase tracking-wider text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2 py-2.5 border-b border-[#D8E2E6] dark:border-[#2C373D]`}>
                            {nameHeader}
                        </th>
                        <th className={`font-sans w-[13%] text-left text-[11.5px] sm:text-[13px] uppercase tracking-wider text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2 py-2.5 border-b border-[#D8E2E6] dark:border-[#2C373D]`}>
                            Series
                        </th>
                        <th className={`font-sans w-[13%] text-left text-[11.5px] sm:text-[13px] uppercase tracking-wider text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2 py-2.5 border-b border-[#D8E2E6] dark:border-[#2C373D]`}>
                            {repsHeader}
                        </th>
                        <th className={`font-sans w-[13%] text-left text-[11.5px] sm:text-[13px] uppercase tracking-wider text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2 py-2.5 border-b border-[#D8E2E6] dark:border-[#2C373D]`}>
                            Desc.
                        </th>
                        <th className="w-[27%] text-left text-[11.5px] sm:text-[13px] uppercase tracking-wider text-[#55656D] dark:text-[#A3B1B8] font-semibold px-2 py-2.5 border-b border-[#D8E2E6] dark:border-[#2C373D]">
                            Nota
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <tr key={i}>
                            <td className={`px-2 py-2.5 text-[14.5px] sm:text-[16px] align-top ${i < rows.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                                <a
                                    href={`https://www.google.com/search?q=${encodeURIComponent(`${r.name} ejercicio`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={`Buscar "${r.name}" en Google`}
                                    className="font-medium underline decoration-dotted underline-offset-4 hover:text-[#BF4A2A] dark:hover:text-[#F0906A]"
                                >
                                    {r.name} <span aria-hidden="true" className="text-[#55656D] dark:text-[#A3B1B8]">↗</span>
                                </a>
                            </td>
                            <td className={`font-sans px-2 py-2.5 text-[14.5px] sm:text-[16px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                                {r.sets}
                            </td>
                            <td className={`font-sans px-2 py-2.5 text-[14.5px] sm:text-[16px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                                {r.reps}
                            </td>
                            <td className={`font-sans px-2 py-2.5 text-[14.5px] sm:text-[16px] tabular-nums align-top ${i < rows.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                                {r.rest}
                            </td>
                            <td className={`px-2 py-2.5 text-[13.5px] sm:text-[15px] text-[#55656D] dark:text-[#A3B1B8] align-top ${i < rows.length - 1 ? "border-b border-[#D8E2E6] dark:border-[#2C373D]" : ""}`}>
                                {r.note}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}