import { AboutUsItem } from "./AboutUsItem"
import AOS from "aos";
import "aos/dist/aos.css";

const AboutUs = () => {
    AOS.init();
    return (
        <>
            <div className="text-[#111] container mx-auto">
                <div className="text-center">
                    <div className="md:text-[36px] text-[30px] font-[800] mt-[70px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
                        About Us
                    </div>
                    <div className="md:text-[20px] text-[16px] mt-[20px] md:mx-[145px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="250">
                        Welcome to Educational Toys - where we are committed to bringing the highest quality products to serve your needs.
                        We put quality and customer satisfaction first.
                    </div>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-1 gap-[20px] mt-[60px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="350">
                    <AboutUsItem
                        title="Our team"
                        desc="We are proud of our professional team, including 7 elite members. They bring a lot of joy and many quality products to customers."
                    />

                    <AboutUsItem
                        title="Products and services"
                        desc="We provide quality. With outstanding characteristics, we are committed to bringing the best value to customers."
                    />

                    <AboutUsItem
                        title="Achievements"
                        desc="Achieved excellent performance in sales of school supplies."
                    />
                </div>


                <div className="bg-[#554BF2] text-[#ffff] mt-[60px] text-center py-[70px] px-[70px] rounded-[10px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
                    <div className="md:text-[36px] text-[24px] font-[700]">
                        If You Have More Questions Contact Us
                    </div>
                    <div className="text-[18px] mt-[20px]">
                        We are a growing business with customer service is at the heart of everything we do. If you have any questions, feedback, or need assistance, you can reach us as follows:
                    </div>

                    <div className="mt-[32px] flex justify-center items-center">
                        <button className="text-[#111] bg-[#ffff] py-[16px] px-[16px] border-0"> <span className="text-[#554BF2] font-[700]">Email:</span> care@educationaltoys.co.uk</button>
                    </div>
                </div>

                <div className="text-center mt-[70px]">
                    <div className="text-[36px] font-[700] mb-[60px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="150">
                        Some notable information
                    </div>

                    <div className="grid md:grid-cols-4 grid-cols-1 gap-[20px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="250">
                        <div className="bg-[#554BF2] pt-[20px] px-[20px] pb-[50px] rounded-[10px]">
                            <div className="text-[60px] font-[700] text-[#fff]">
                                500
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#fff] font-[700]">
                                Loyal Customers
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#fff]">
                                Thank you for always supporting us.
                            </div>
                        </div>

                        <div className="bg-[#F2F2F2] pt-[20px] px-[20px] pb-[50px] rounded-[10px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="350">
                            <div className="text-[60px] font-[700] text-[#554BF2]">
                                140
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#111] font-[700]">
                                Efficient Specialists
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#A49999]">
                                We always meet customer requirements in the most effective way.
                            </div>
                        </div>

                        <div className="bg-[#554BF2] pt-[20px] px-[20px] pb-[50px] rounded-[10px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="450">
                            <div className="text-[60px] font-[700] text-[#fff]">
                                20
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#fff] font-[700]">
                                Successful Business Plans
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#fff]">
                                In the future we always want to complete more plans
                            </div>
                        </div>

                        <div className="bg-[#F2F2F2] pt-[20px] px-[20px] pb-[50px] rounded-[10px]" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="550">
                            <div className="text-[60px] font-[700] text-[#554BF2]">
                                56
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#111] font-[700]">
                                Investment Opportunities
                            </div>
                            <div className="mt-[20px] text-[20px] text-[#A49999]">
                                Investing in our products will never disappoint you with the quality it brings.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs