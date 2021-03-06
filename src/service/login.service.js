import { api, apiAuth } from "./api";

import { encryptValue, decryptJWT } from "../utils/cryptography";

export async function login(loginData, shouldGetUser = true) {

    return api.post("/login", loginData).then((response) => {
        return new Promise((resolve, reject) => {
            if (response.data) {
                localStorage.setItem("@opr/token", response.data);
                const jwtDecrypted = decryptJWT(response.data);

                if (shouldGetUser) {
                    if (jwtDecrypted.tipo_de_usuario === "cidadao") {
                        getCitizen(jwtDecrypted.cpf).then((response) => {
                            resolve(response[0]);
                        })
                    } else {
                        getLegislator(jwtDecrypted.cpf).then((response) => {
                            resolve(response[0]);
                        })
                    }
                } else {
                    resolve();
                }
            } else {
                reject();
            }
        })
    });
}

async function getCitizen(citizenCpf) {
    return apiAuth.post("/search/cidadao", {
        cpf: citizenCpf
    }).then((response) => {
        if (response.data) {
            return(response.data)
        }
    });
}

async function getLegislator(legislatorCpf) {
    return apiAuth.post("/search/legislador", {
        cpf: legislatorCpf
    }).then((response) => {
        if (response.data) {
            return(response.data)
        }
    });
}