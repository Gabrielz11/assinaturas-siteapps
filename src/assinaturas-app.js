$(document).ready(function(){
  $.getScript("https://sandbox.moip.com.br/moip-assinaturas.min.js");
  $('head').append('<link rel="stylesheet" href="http://empregonamira.com.br/assets/siteapps.css" type="text/css" />');

  var assinaturas = document.createElement("div");
  $(assinaturas).attr("class", "assinaturas");

  var container = document.createElement("div");
  $(container).attr("class", "assinaturas-container");

  var alert = document.createElement("div");
  $(alert).attr("class", "assinaturas-error");
  $(alert).hide();
  $(alert).append("<p>Corrija os seguintes campos: </p>");

  $(container).append(alert);

  buildForm(container);

  $(assinaturas).append(container);

  var assinar = document.createElement("img");
  $(assinar).attr("src", "http://empregonamira.com.br/assets/button.png");
  $(assinaturas).append(assinar);

  $(assinar).click(function(){
    var moip = new MoipAssinaturas("[%token%]");
    var customer = build_customer();
    var subscription_code = new Date().getTime();

    moip.subscribe(
        new Subscription()
            .with_code(subscription_code)
            .with_new_customer(customer)
            .with_plan_code("[%plan_code%]")
    ).callback(function(response){
        if (!response.has_errors()) {
            alert("Assinado");
        } else {
          console.log(response);
          $(".assinaturas-error").empty();
          for (i = 0; i < response.errors.length; i++) {
            var erro = response.errors[i].description;
            $(".assinaturas-error").append("<p>" + erro + "</p>");
            $(".assinaturas-error").fadeIn();
          }
        }
    });
  });

  $("#[%tag%]").append(assinaturas);

});


function createField(id, label) {
  var labelForm = document.createElement("label");
  $(labelForm).text(label);

  var el = document.createElement("input");
  $(el).attr("id", id);

  $(labelForm).append(el);
  return labelForm;
};

function buildForm(assinaturas) {
  $(assinaturas).append(createField("fullname", "Nome: "));
  $(assinaturas).append(createField("email", "E-mail: "));
  $(assinaturas).append(createField("cpf", "CPF: "));
  $(assinaturas).append(createField("birthdate_day", "Nascimento: "));
  $(assinaturas).append(createField("birthdate_month", "Nascimento: "));
  $(assinaturas).append(createField("birthdate_year", "Nascimento: "));
  $(assinaturas).append(createField("ddd", "DDD: "));
  $(assinaturas).append(createField("phone", "Telefone: "));
  $(assinaturas).append(createField("rua", "Rua: "));
  $(assinaturas).append(createField("numero", "Número: "));
  $(assinaturas).append(createField("bairro", "Bairro: "));
  $(assinaturas).append(createField("cep", "CEP: "));
  $(assinaturas).append(createField("cidade", "Cidade: "));
  $(assinaturas).append(createField("estado", "Estado: "));
  $(assinaturas).append(createField("holder_name", "Nome no cartão: "));
  $(assinaturas).append(createField("expiration_month", "Expiracao mes: "));
  $(assinaturas).append(createField("expiration_year", "Expiracao ano: "));
  $(assinaturas).append(createField("credit_card", "Cartão: "));
}

