import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";

import { database } from "../firebase";
import { toast } from "react-toastify";

const Links = () => {
    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const getLinks = async () => {
        database.collection("links").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
    };

    const onDeleteLink = async (id) => {
        if (window.confirm("are you sure you want to delete this link?")) {
            await database.collection("links").doc(id).delete();
            toast("Link Removed Successfully", {
                type: "error",
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        getLinks();
    }, []);

    const addOrEditLink = async (linkObject) => {
        try {
            if (currentId === "") {
                await database.collection("links").doc().set(linkObject);
                toast("New Link Added", {
                    type: "success",
                });
            } else {
                await database
                    .collection("links")
                    .doc(currentId)
                    .update(linkObject);
                toast("Link Updated Successfully", {
                    type: "info",
                });
                setCurrentId("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="col-md-4 p-2">
                <LinkForm {...{ addOrEditLink, currentId, links }} />
            </div>
            <div className="col-md-8 p-2">
                {links.map((link) => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i
                                        className="material-icons text-danger"
                                        onClick={() => onDeleteLink(link.id)}
                                    >
                                        close
                                    </i>
                                    <i
                                        className="material-icons"
                                        onClick={() => setCurrentId(link.id)}
                                    >
                                        create
                                    </i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Go to Website
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Links;
