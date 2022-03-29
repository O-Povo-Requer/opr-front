import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';

import './styles.css';

import ModalRequirements from '../ModalRequirements';

export default function Requirement({requirement}) {
    const [shouldOpenModal, setShouldOpenModal] = useState(false);
    const showReqModalRef = useRef();

    useEffect(() => {
        if (shouldOpenModal) {
            showReqModalRef.current.openModal();
        }
    }, [shouldOpenModal])

    function renderRequirementStatus() {
        if (requirement.status === "concluded") {
            return (
                <div className="requirement_status finished">
                    <span>Concluído</span>
                </div>
            )
        } else if (requirement.status === "not_accepted") {
            return (
                <div className="requirement_status closed">
                    <span>Não aceito</span>    
                </div>
            )
        } else {
            return (
                <div className="requirement_status analisys">
                    <span>Em avaliação</span>
                </div>
            )
        }
    }

    return (
        <>
            <div className="requirement_container" onClick={() => setShouldOpenModal(true)}>
                {renderRequirementStatus()}

                <section className="requirement_user">
                    <div className="user_image">
                        <img src="/profile.png" alt="user-img" />
                    </div>
                    <div className="user_infos">
                        <span>{requirement.nome}</span>
                        <span>{requirement.cidade}</span>
                    </div>
                </section>

                <section className="requirement_infos">
                    <strong>{requirement.titulo}</strong>
                    <p>{requirement.descricao}</p>
                </section>

                <section className="requirement_date">
                    <label>Data de publicação:</label>
                    <br />
                    <span>{requirement.data}</span>
                </section>

            </div>

            {shouldOpenModal && 
                <ModalRequirements closingModal={() => setShouldOpenModal(false)} ref={showReqModalRef} requirement={requirement}/>
            }
        </>
    )
}