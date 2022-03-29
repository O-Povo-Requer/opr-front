import React, { useEffect, useState } from 'react';
import { ThumbUpOutlined, CommentOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

import ProjectLogo from "../../assets/ProjectLogo.png"
import { getHypedRequirement } from '../../service/requirements.service';
import './styles.css';

export default function LandingPage() {
    const [requirements, setRequirements] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getHypedRequirement().then((response) => {
            console.log(response)
            setRequirements(response)
        })
    }, [])

    function redirectToLogin() {
        navigate("/login");
    }

    return (
        <div className="landing_page">
            <svg viewBox="0 0 500 150" preserveAspectRatio="xMinYMin meet" className="wave_svg_container">
                <path d="M0,120 C150,200 350,80 500,130 L500,0 L0,0 Z" className="wave_svg"></path>
            </svg>

            <div className="landing_page_header">
                <div className="project_logo">
                    <img src={ProjectLogo} alt="Projetc Logo" />
                </div>
                <button className="login_button" onClick={() => redirectToLogin()}>
                    Login
                </button>
            </div>

            <section className="landing_page_title">
                <h1>Quando o mundo todo está em<br />silêncio, até uma única voz se torna<br />poderosa!</h1>
                <span>Faça parte da voz da sua comunidade assim como as pessoas abaixo!</span>
            </section>

            <section className="requirements_container">
                {requirements.map((requirement, index) => (
                    <div className="requirement" key={index}>
                        <section className="user_section">
                            <div className="user_image">
                                <img src="/profile.png" alt="user-image" />
                            </div>
                            <div className="user_infos">
                                <span>{requirement.nome}</span>
                                <span>{requirement.cidade}</span>
                            </div>
                        </section>

                        <section className="requirement_infos">
                            <span>{requirement.titulo}</span>
                            <p>{requirement.descricao}</p>
                        </section>

                        <section className="requirement_actions">
                            <div className="support_requirement">
                                <ThumbUpOutlined style={{ color: "#666666" }}/>
                                <span>{requirement.curtidas} Apoios</span>
                            </div>

                            <div className="support_requirement">
                                <CommentOutlined style={{ color: "#666666" }}/>
                                <span>{requirement.comentarios} Comentários</span>
                            </div>
                        </section>
                    </div>
                ))}
            </section>

        </div>
    )
}