import footerStyles from './footer.module.css'
import TrustPilot from '../../assets/images/fakeTrustPilot.png'
import Payment from '../../assets/images/paymentFakeImage.png'
import { FOOTER_LINKS, FOOTER_NAVIGATES } from '../../constants/footerNavigater'
import { FaRegHeart } from 'react-icons/fa'

function Footer() {
    return (
        <footer className={footerStyles['footer']}>
            <div className="container hidden md:block">
                <div className={footerStyles['footer__trust-pilot']}>
                    <img
                        src={TrustPilot}
                        alt="fake trust pilot"
                        style={{
                            width: '247px',
                            height: '109px',
                            padding: '4px',
                        }}
                    />
                </div>
                <div className={footerStyles['footer__links']}>
                    {FOOTER_LINKS.map((group) => (
                        <div key={group.id}>
                            <p
                                style={{
                                    fontWeight: 800,
                                    fontSize: '18px',
                                    lineHeight: '21px',
                                    paddingBlock: '16px',
                                    margin: 0,
                                }}
                            >
                                {group.label}
                            </p>
                            <ul style={{ margin: 0, padding: 0 }}>
                                {group.children.map((link) => (
                                    <li
                                        key={link.id}
                                        style={{ marginTop: '5px' }}
                                    >
                                        <a
                                            href={link.path}
                                            style={{
                                                color: 'black',
                                                fontWeight: 400,
                                                fontSize: '15px',
                                                lineHeight: '24px',
                                            }}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    {}
                    <div className={footerStyles['footer__subscribe']}>
                        <h3
                            style={{
                                fontWeight: 800,
                                fontSize: '18px',
                                lineHeight: '21px',
                                paddingBlock: '16px',
                                margin: 0,
                            }}
                        >
                            Newsletter
                        </h3>
                        <p
                            style={{
                                color: 'black',
                                fontWeight: 400,
                                fontSize: '15px',
                                lineHeight: '24px',
                                margin: '5px',
                            }}
                        >
                            Sign up to receive new news via email
                        </p>
                        <form className={footerStyles['subscribe-form']}>
                            <input
                                type="email"
                                className={footerStyles['subscribe-input']}
                                placeholder="Email Address"
                            />
                            <button
                                type="submit"
                                className={footerStyles['subscribe-button']}
                            >
                                Subcribe
                            </button>
                        </form>
                    </div>
                </div>
                <div style={{ marginTop: '68px' }}>
                    <button className={footerStyles['button']}>
                        <FaRegHeart />
                        Follow on <span style={{ fontWeight: 600 }}>Shop</span>
                    </button>
                </div>
                <div
                    style={{
                        marginTop: '40px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div>
                        <ul
                            style={{ margin: 0, padding: 0 }}
                            className={footerStyles['footer__navigates']}
                        >
                            {FOOTER_NAVIGATES.map((item) => (
                                <li
                                    key={item.id}
                                    className={
                                        footerStyles['footer__navigates--item']
                                    }
                                >
                                    <a
                                        href={item.path}
                                        style={{
                                            color: 'black',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <p
                            style={{
                                fontSize: '13px',
                                lineHeight: '15px',
                                margin: '5px 0 0 0',
                            }}
                        >
                            Copyright © 2024 Educational Toys.
                        </p>
                    </div>
                    <img src={Payment} alt="payment" />
                </div>
            </div>
        </footer>
    )
}

export default Footer
