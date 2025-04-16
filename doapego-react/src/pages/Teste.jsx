export default function Teste() {
    const config = {
        titulo: "USUÁRIOS",
        colunas: [
            { key: "avatar", label: "Foto", temImagem: true }, //ordem importa
            { key: "nome", label: "Nome", temImagem: false },
            { key: "email", label: "E-mail", temImagem: false },
            { key: "telefone", label: "Telefone", temImagem: false },
        ]
    };

    const itemData = {
        nome: "Maria da Silva",
        email: "maria@empresa.com",
        avatar: "https://picsum.photos/200/200",
        telefone: "(11) 91234-5678",
    };

    return (
        <main className="container my-5 nao-unico-elemento">
            <h2 className="titulo-pagina mb-5">DETALHES DE {config.titulo}</h2>

            <section className="container form-container-crud">
                <div className="mb-3">
                    {config.colunas.map(col => (
                        <div key={col.key} className="col-12 mb-3">
                            {/* Área modificada */}
                            {col.temImagem ? (
                                <>
                                    <label className="form-label fw-semibold d-block mb-1">{!col.temImagem && col.label}{!col.temImagem && ":"}</label>
                                    <div className="d-flex flex-column align-items-center">
                                        <img
                                            src={itemData[col.key]}
                                            alt={col.label}
                                            className="rounded shadow-sm"
                                            style={{ width: "200px", height: "200px", objectFit: "cover" }}
                                        />
                                        <hr style={{ margin: "3rem", width: "8rem" }} />
                                    </div>
                                </>
                            ) : (
                                // Novo layout para campos não-imagem
                                <div className="d-flex align-items-center">
                                    <span className="fw-semibold" style={{ minWidth: "80px" }}>
                                        {col.label}:
                                    </span>
                                    <p className="form-control-plaintext text-dark mb-0">
                                        {itemData[col.key]}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
