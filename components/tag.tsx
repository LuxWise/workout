export function Tag({ label, color }: { label: string; color: "ember" | "moss" | "sky" }) {
    const styles = {
        ember: "bg-[#FBE6DD] text-[#BF4A2A] dark:bg-[#3A2A24] dark:text-[#F0906A]",
        moss: "bg-[#DDF0EB] text-[#1F7A6B] dark:bg-[#1F3733] dark:text-[#6FCDB9]",
        sky: "bg-[#DEE9FA] text-[#2F5FB3] dark:bg-[#1F2D45] dark:text-[#8DB4F0]",
    };
    const cls = styles[color];
    return (
        <span className={`font-sans inline-block text-[11.5px] sm:text-[13px] uppercase tracking-[0.06em] font-semibold rounded-full px-2.5 py-0.75 ${cls}`}>
            {label}
        </span>
    );
}