module.exports = {
  name: "ef-graphql-response",
  organization: 'se-apps',
  origins: [
    {
      name: "origin",
      override_host_header: "graphqlzero.almansi.me",
      hosts: [
        {
          location: {
            hostname: "graphqlzero.almansi.me",
            port: 443
          },
          scheme: 'https'
        },
      ],
      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: "graphqlzero.almansi.me",
      },
    },
  ],
};
