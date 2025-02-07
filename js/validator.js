$(function () {
    emailjs.init("xDe2InNKZuvbCpRIg"); // Remplace par ton EmailJS user ID

    $("#contactForm input,#contactForm textarea,#contactForm button").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            
            // Récupération des valeurs du formulaire
            var name = $("input#name").val();
            var email = $("input#email").val();
            var message = $("textarea#message").val();
            var firstName = name;

            // Vérification du prénom pour les messages de succès/échec
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }

            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Désactiver le bouton d'envoi pour éviter les doublons

            // Envoi du mail via EmailJS
            emailjs.send("service_6goikhf", "template_1hsiurs", {
                user_name: name,
                user_email: email,
                from_name: name,
                message: message
            })
            .then(function (response) {
                // Message de succès
                $("#success").html("<div class='alert alert-success'>");
                $("#success > .alert-success")
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("</button>");
                $("#success > .alert-success").append("<strong>Votre message a été envoyé. </strong>");
                $("#success > .alert-success").append("</div>");
                
                // Réinitialisation du formulaire
                $("#contactForm").trigger("reset");
            }, function (error) {
                // Message d'erreur
                $("#success").html("<div class='alert alert-danger'>");
                $("#success > .alert-danger")
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("</button>");
                $("#success > .alert-danger").append(
                    $("<strong>").text("Désolé " + firstName + ", il y a eu un problème. Veuillez réessayer plus tard !")
                );
                $("#success > .alert-danger").append("</div>");
            })
            .finally(function () {
                setTimeout(function () {
                    $this.prop("disabled", false); // Réactivation du bouton
                }, 1000);
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/* Réinitialiser les messages de succès/échec au focus */
$("#name").focus(function () {
    $("#success").html("");
});
