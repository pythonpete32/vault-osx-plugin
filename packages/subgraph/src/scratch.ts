const query = `
  {
    installations {
      id
      dao { id }
      sender
      pluginSetupRepo
      data
      plugin
      preparedSetupId
    }
  }
`;

async function main() {
    const res = await fetch('http://localhost:42069', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    })
    const json = await res.json()
    json.data.installations.forEach((i: any) => {
        if (i.pluginSetupRepo === "0xef7De2e4ec36211B22361EB7DA97f9F1f3152053") {
            console.log(i)
        }
    })
}
main().catch(console.error)
