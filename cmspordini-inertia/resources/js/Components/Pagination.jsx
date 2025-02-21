import React from "react";
import { router } from "@inertiajs/react";
import DOMPurify from "dompurify";
import "../../css/pagination.css";

const Pagination = ({ links }) => {
    const handlePageChange = (url) => {
        if (!url) return;
        router.get(url, { preserveState: true, preserveScroll: true });
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={`page-item ${link.active ? "active" : ""} ${
                            !link.url ? "disabled" : ""
                        }`}
                    >
                        <button
                            className="page-link"
                            href={link.url || "#"}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(link.url);
                            }}
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(link.label),
                            }}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
