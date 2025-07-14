//src/pages/Tutorial.jsx
export default function Tutorial() {
  return (
    <main>
      <div className="container my-5 px-5 d-flex flex-column gap-4">
        <div className="d-flex flex-column gap-4">
          <h2 className="titulo-pagina">COMO DOAR</h2>
          <h2 className="subtitulo mb-4">Confira nosso passo a passo para doar e fazer a diferença!</h2>

          <div className="list-group">
            {[
              "Para fazer a sua doação, o primeiro passo é ter o nosso aplicativo Doapego!",
              "Se ainda não tem a nossa plataforma, é bem simples de conseguir! Basta procurar por \"Doapego\" na sua loja de aplicativos, fazer o download e criar sua conta com seus dados, tudo rapidinho e sem complicação!",
              "Com a sua conta ativa, clique em \"Doações\". Se você já fez doações antes, verá um histórico com as doações enviadas. Caso contrário, é só seguir para o próximo passo!",
              "Clique no botão \"DOAR\". Você será direcionado para uma tela onde deverá preencher as informações sobre o brinquedo que deseja doar, como nome, descrição e ONG.",
              "Depois de preencher todos os dados, clique para enviar sua proposta de doação. A ONG escolhida irá revisar sua doação e decidir se aceita ou não.",
              "Assim que a doação for aprovada, você e a ONG irão combinar o ponto de entrega. O processo é simples e rápido, e juntos farão toda a diferença!",
              "Se ocorrer algum problema durante o processo, entre em contato conosco pelo nosso e-mail de suporte, e ajudaremos a resolver!",
            ].map((texto, index) => (
              <div key={index} className="d-flex align-items-start mb-4">
                <div
                  className="rounded-circle text-white d-flex justify-content-center align-items-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    fontWeight: "bold",
                    backgroundColor: "var(--color-secondary)",
                  }}
                >
                  {index + 1}
                </div>
                <p className="ms-3 mb-0">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main >
  )
}