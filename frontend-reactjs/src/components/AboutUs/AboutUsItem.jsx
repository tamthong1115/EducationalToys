export const AboutUsItem = (props) => {
    const {title, desc} = props;
    return (
        <>
            <div className="bg-[#F2F2F2] p-[30px] rounded-[10px]">
                <div className="text-[20px] font-[700] text-[#111]">
                    {title}
                </div>
                <div className="mt-[20px] text-[18px]">
                    {desc}
                </div>
            </div>
        </>
    )
}