import { api, apiAuth } from "./api";

export async function createRequirement(requirementData) {
    return new Promise((resolve, reject) => {
        apiAuth.post("/requerimento/novo", requirementData).then((response) => {
            resolve(response.data.requerimentoCriado);
        }).catch(() => {
            reject();
        })
    })
}

export async function modifyRequirement(updateData, requirementId) {
  return new Promise(async (resolve, reject) => {
    return apiAuth
      .put(`/requerimento/edit/${requirementId}`, updateData)
      .then((response) => {
        if (response.data.requerimentoAlterado) {
          resolve(response.data.requerimentoAlterado);
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });
}

export async function getHypedRequirement() {
  return new Promise((resolve, reject) => {
    api.get("/emalta")
      .then((response) => {
        if (response.data.emalta) {
          resolve(response.data.emalta);
        }
      })
      .catch(() => {
        reject();
      });
  });
}

export async function getRequirement(requirementId) {
  return new Promise((resolve, reject) => {
    apiAuth
      .get("/requerimento", {
        params: {
          id: requirementId,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        reject();
      });
  });
}

export async function listAllRequirements(queryParams) {
    return new Promise((resolve, reject) => {
        apiAuth.get("/requerimentos", {
            params: queryParams
        }).then((response) => {
            resolve(response.data);
        }).catch(() => {
            reject();
        })
    })
}

export async function getLikeAndComments(requirementId) {
    let likes = 0;
    let comments = [];
    
    await apiAuth.post("/curtidas_por_requerimento", {
        idRequerimento: requirementId
    }).then((response) => {
        if (!response.data.message === "Este requerimento ainda não recebeu curtidas.") {
            likes = response.data.total_curtidas;
        } 
    }).catch(() => {
      likes = 0
    })

    await apiAuth.post("requerimento/comentarios", {
        requerimento: requirementId
    }).then((response) => {
        if (!response.data.message) {
          comments = response.data.comentarios
        }
    }).catch(() => {
      comments = []
    })

    return {likes, comments};
}

export async function changeRequirementStatus(updateData, requirementId) {
    return new Promise((resolve, reject) => {
        apiAuth.put(`/requerimento/edit/${requirementId}`, {
            updateData
        }).then((response) => {
            if (response.data.requerimentoAtualizado) {
                resolve(response.data.requerimentoAtualizado)
            } else {
                reject();
            }
        }).catch(() => {
            reject();
        })
    })
} 

export async function supportRequirement(supportData) {
  return new Promise((resolve, reject) => {
    apiAuth.post("/curtida", supportData).then((response) => {
      if (response.data.message === "Curtida realizada com sucesso!") {
        resolve();
      } else {
        reject();
      }
    }).catch(() => {
      reject();
    })
  })
}

export async function unsupportRequirement(supportData) {
  return new Promise((resolve, reject) => {
    apiAuth.delete("/curtida", supportData).then((response) => {
      if (response.data.message === "Requerimento descurtido com sucesso.") {
        resolve();
      } else {
        reject();
      }
    }).catch(() => {
      reject();
    })
  })
}

export async function createComment(commentData) {
  return new Promise((resolve, reject) => {
    apiAuth.post("comentario", commentData).then((response) => {
      if (response.data.ComentarioCriado) {
        resolve();
      } else {
        reject();
      }
    }).catch(() => {
      reject();
    })
  })
}