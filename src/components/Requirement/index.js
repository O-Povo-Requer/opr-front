import React, { useRef, useState } from 'react';
import moment from 'moment';

import { api } from '../../service/api';

import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import './styles.css';

import Modal from '../Modal';

export default function Requirement({requirement}) {
    const showReqModalRef = useRef();
    const requirementUser = requirement.user;
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState('');

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

    function clickLike() {
        setLiked(!liked);
        if (liked) {
            api.delete('/curtida', requirementUser);
        } else {
            api.post('/curtida', requirementUser);
        }
    }

    function clickComment() {
        if (comment !== '') {
            api.post('/comentario', requirementUser, comment);
        }
    }

    return (
        <>
            <div className="requirement_container" onClick={() => showReqModalRef.current.openModal()}>
                {renderRequirementStatus()}

                <section className="requirement_user">
                    <div className="user_image">
                        <img src="/profile.png" alt="user-img" />
                    </div>
                    <div className="user_infos">
                        <span>{requirementUser.name}</span>
                        <span>{requirementUser.location}</span>
                    </div>
                </section>

                <section className="requirement_infos">
                    <strong>{requirement.title}</strong>
                    <p>{requirement.description}</p>
                </section>

                <section className="requirement_date">
                    <label>Data de publicação:</label>
                    <br />
                    <span>{moment.unix(requirement.creationDate).format("DD/MM/YYYY")}</span>
                </section>

            </div>
            <Modal ref={showReqModalRef}>
                <section className="requirement_modal_title">
                    <h1>Visualização de requerimento</h1>
                </section>
                <section className="requirement_modal_user">
                    <div className="requirement_modal_profile">
                        <img src="/profile.png" alt="user-img" />
                        <div className="requirement_modal_user_info">
                            <span><strong>{requirementUser.name}</strong></span>
                            <span>{requirementUser.location}</span>
                        </div>
                    </div>
                    <div className="requirement_modal_ocourr_date">
                        <span><strong>Data do ocorrido:</strong> {moment.unix(requirement.creationDate).format("DD/MM/YYYY")}</span>
                    </div>
                </section>
                <section className="requirement_modal_status">
                    <div>
                        <span className="requirement_modal_status_user">Requerimento do Usuário {requirementUser.name}</span>
                        <div className="requirement_modal_status_date"><strong>Criado em: </strong> {moment.unix(requirement.creationDate).format("DD/MM/YYYY")}</div>
                    </div>
                    {renderRequirementStatus()}
                </section>
                <div className="requirement_modal_tags">
                    {requirement.tags?.map((tag, index) => (
                        <div key={index} className="requirement_modal_tag">
                            {tag}
                            <div>+</div>
                        </div>
                    ))}
                </div>
                <div className="requirement_modal_message">
                    {requirement.message}
                </div>
                <div className="requirement_modal_likes">
                    { liked ?
                        <ThumbUpIcon style={{ color: 'var(--blue)', width: '20px', cursor: 'pointer'}} onClick={clickLike} />
                    :
                        <ThumbUpAltOutlinedIcon style={{ color: 'var(--descriptions)', width: '20px', cursor: 'pointer'}} onClick={clickLike} />
                    }
                    
                    <div>{requirement.likes} Apoios</div>
                </div>
                <div className="requirement_modal_midia_comments">
                    <section className="requirement_modal_midias">
                        <span><strong>Lista de mídias</strong></span>
                        <div>
                            {requirement.media?.map((mda, index) => (
                                <img src={mda} key={index} alt={`media${index}`} className="image_cropped" />
                            ))}
                        </div>
                    </section>
                    <section className="requirement_modal_comments">
                        <span><strong>Comentários</strong></span>
                        <div className="requirement_modal_comment">
                            {requirement.comments?.map((comment, index) => (
                                <>
                                    <div key={index} className="requirement_modal_comment_user">
                                        <img src={comment.profile} alt={`Foto de ${comment.name}`} className="image_profiles" />
                                        <span><strong>{comment.name}</strong></span>
                                    </div>
                                    <div className="requirement_modal_comment_message">
                                        {comment.message}
                                    </div>
                                </>
                            ))}
                        </div>
                    </section>
                </div>
                <div className="requirement_modal_legislators_comment">
                    <section>
                        <span><strong>Legisladores associados</strong></span>
                        <div className="requirement_modal_legislators">
                            {requirement.legislators?.map((legislator, index) => (
                                <div key={index} className="requirement_modal_legislator">
                                    <span><strong>{legislator.name}</strong></span>
                                    <span style={{ color: 'var(--descriptions)' }}>{legislator.party}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="requirement_modal_comment_input">
                        <input type='text' value={comment} onChange={(e) => setComment(e.target.value)}/>
                        <button type='submit' onClick={clickComment}>Comentar</button>
                    </section>
                </div>
            </Modal>
        </>
    )
}