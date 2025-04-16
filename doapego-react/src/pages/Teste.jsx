import noImageIcon from "../img/noimage-icon.svg";

export default function Teste() {
    const config = {
        titulo: "USUÁRIOS",
        colunas: [
            { key: "avatar", label: "Foto", temImagem: true },
            { key: "nome", label: "Nome", temImagem: false },
            { key: "email", label: "E-mail", temImagem: false },
            { key: "telefone", label: "Telefone", temImagem: false },
        ],
    };

    const itemData = {
        nome: "Maria da Silva",
        email: "maria@empresa.com",
        avatar: "",
        telefone: "(11) 91234-5678",
    };

    return (
        <main className="container my-5 nao-unico-elemento">
            <h2 className="titulo-pagina mb-5">DETALHES DE {config.titulo}</h2>

            <section className="container form-container-crud">
                {config.colunas
                    .filter((col) => col.temImagem)
                    .map((col) => {
                        const imagem = itemData[col.key];
                        const temImagem =
                            imagem !== null &&
                            imagem !== undefined &&
                            String(imagem).trim() !== "";

                        const imagemUrl = temImagem ? imagem : noImageIcon;


                        return (
                            <div
                                key={col.key}
                                className="d-flex flex-column align-items-center mb-4"
                            >
                                <img
                                    src={imagemUrl}
                                    alt={col.label}
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                        objectFit: "cover",
                                        padding: !temImagem ? "2rem" : "0",
                                        backgroundColor: !temImagem ? "#fdfdfd" : "transparent",
                                    }}
                                />
                                <hr style={{ marginTop: "3rem", width: "8rem" }} />
                            </div>
                        );
                    })}

                {/* Mini tabela para os demais dados */}
                <div className="table-responsive">
                    <table className="table table-bordered align-middle mb-0">
                        <tbody>
                            {config.colunas
                                .filter((col) => !col.temImagem)
                                .map((col) => {
                                    const valor = itemData[col.key];
                                    const temValor =
                                        valor !== null &&
                                        valor !== undefined &&
                                        String(valor).trim() !== "";

                                    return (
                                        <tr key={col.key}>
                                            <th
                                                scope="row"
                                                className="text-nowrap text-secondary fw-semibold"
                                                style={{ width: "30%" }}
                                            >
                                                {col.label}
                                            </th>
                                            <td className={temValor ? "" : "text-muted fst-italic"}>
                                                {temValor ? valor : "Sem informação"}
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}
