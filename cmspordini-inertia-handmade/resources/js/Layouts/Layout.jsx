import { Link, usePage } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import React from "react";
import "../../css/layout.css";
import { useLayout } from "../Hooks/Layouts/useLayout";

export default function Layout({ children }) {
    const { user } = usePage().props;
    const { handleLogout } = useLayout();

    return (
        <div className="body-container">
            <header>
                <h1>
                    <Link id="header-logo" href="/">
                        ORDINI GruppoCMSP
                    </Link>
                </h1>

                {user && (
                    <form onSubmit={handleLogout}>
                        <button className="logout-btn" type="submit">
                            <svg
                                className="logout-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect
                                    x="3"
                                    y="4"
                                    width="12"
                                    height="16"
                                    rx="1"
                                />
                                <path d="M15 12h6" />
                                <path d="M18 9l3 3-3 3" />
                            </svg>
                        </button>
                    </form>
                )}
            </header>

            {/* Contenuto principale */}
            <main>{children}</main>

            {/* Footer */}
            <footer>
                <p>
                    &copy;{" "}
                    <a target="_blank" href="http://www.infogeneration.it">
                        INFOGENERATION
                    </a>
                </p>
            </footer>

            <ToastContainer position="bottom-right" closeOnClick={true} />
        </div>
    );
}
