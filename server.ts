import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client securely on the server
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint to analyze choices with Gemini and send the HTML report via Resend
app.post("/api/analyze-and-send", async (req, res) => {
  try {
    const {
      email,
      companyName,
      phone,
      country,
      usersCount,
      allocatedBudget,
      erp,
      industry,
      volume,
      processes,
      complianceConstraint,
      recommendations,
      lang
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const userLang = lang || "FR";
    console.log(`Starting Gemini analysis for ${email} (${companyName}) in language: ${userLang}`);

    // Build localized prompt for Gemini analysis
    let prompt = "";
    if (userLang === "ES") {
      prompt = `Usted es Documatch CONTEXT, un consultor experto en sistemas de archivo y Gestión Electrónica de Documentos (GED / DMS).
Analice el siguiente perfil de la empresa:
- Nombre de la empresa: ${companyName || 'Documatch Guest'}
- Sector de actividad: ${industry}
- Sistema ERP actual: ${erp}
- Volumen mensual de documentos: ${volume}
- Número de usuarios previstos: ${usersCount}
- Presupuesto asignado: ${allocatedBudget} €
- Procesos de negocio prioritarios: ${processes}
- Restricciones regulatorias y de cumplimiento: ${complianceConstraint}
- Clasificación de las GED recomendadas: ${recommendations}

Genere un análisis experto exhaustivo y personalizado en español.
Su análisis debe incluir las siguientes secciones:
1. Análisis estratégico del contexto: Evaluación de su situación en relación con su sector (${industry}) y su ERP (${erp}).
2. Justificación de las recomendaciones: Por qué estos softwares específicos se adaptan mejor a sus procesos y volúmenes.
3. Guía de integración técnica: Recomendaciones precisas para conectar la GED a su ERP existente.
4. Cumplimiento y archivo: Soluciones concretas para respetar las restricciones especificadas (${complianceConstraint}).
5. Plan de acción: Los siguientes pasos recomendados para llevar a cabo con éxito su proyecto.

Instrucciones de formato del correo electrónico:
- Devuelva ÚNICAMENTE el código HTML limpio y compatible con correo electrónico para el contenido del análisis.
- Utilice etiquetas estándar como <p>, <ul style="padding-left:20px;margin:8px 0;color:#cbd5e1;">, <li style="margin-bottom:6px;">, <strong style="color:#ffffff;"> y subtítulos <h3 style="color:#60a5fa;font-size:15px;font-weight:700;margin-top:24px;margin-bottom:8px;">.
- No incluya ningún encabezado HTML global (como <html>, <body>, <head>), comience directamente con el contenido interno.
- No utilice bloques de código ni etiquetas markdown para el estilo. Devuelva únicamente texto formateado en HTML.
- Sea extremadamente profesional, alentador y exhaustivo.`;
    } else if (userLang === "EN") {
      prompt = `You are Documatch CONTEXT, an expert consultant in archiving systems and Document Management Systems (DMS / GED).
Analyze the following company profile:
- Company Name: ${companyName || 'Documatch Guest'}
- Industry: ${industry}
- Current ERP System: ${erp}
- Monthly Document Volume: ${volume}
- Planned Number of Users: ${usersCount}
- Allocated Budget: ${allocatedBudget} €
- Priority Business Processes: ${processes}
- Regulatory & Compliance Constraints: ${complianceConstraint}
- Classification of Recommended DMS: ${recommendations}

Generate an in-depth and personalized expert analysis in English.
Your analysis must include the following sections:
1. Strategic Context Analysis: Assessment of their situation in relation to their industry (${industry}) and their ERP (${erp}).
2. Justification of Recommendations: Why these specific software solutions are best suited to their processes and volumes.
3. Technical Integration Guide: Precise recommendations for connecting the DMS to their existing ERP.
4. Compliance & Archiving: Concrete solutions to meet the specified constraints (${complianceConstraint}).
5. Action Plan: Recommended next steps to successfully complete their project.

Email formatting guidelines:
- Return ONLY clean, email-compatible HTML code for the content of the analysis.
- Use standard tags such as <p>, <ul style="padding-left:20px;margin:8px 0;color:#cbd5e1;">, <li style="margin-bottom:6px;">, <strong style="color:#ffffff;"> and subheadings <h3 style="color:#60a5fa;font-size:15px;font-weight:700;margin-top:24px;margin-bottom:8px;">.
- Do NOT include any global HTML headers (like <html>, <body>, <head>), start directly with the inner content.
- Do not use code blocks or markdown tags for styling. Return only HTML formatted text.
- Be extremely professional, encouraging, and comprehensive.`;
    } else {
      // Default to French
      prompt = `Vous êtes Documatch CONTEXT, un consultant expert en systèmes d'archivage et de Gestion Électronique des Documents (GED).
Analysez le profil suivant de l'entreprise :
- Nom de l'entreprise : ${companyName || 'Documatch Guest'}
- Secteur d'activité : ${industry}
- Système ERP actuel : ${erp}
- Volume mensuel de documents : ${volume}
- Nombre d'utilisateurs prévus : ${usersCount}
- Budget alloué : ${allocatedBudget} €
- Processus métiers prioritaires : ${processes}
- Contraintes réglementaires et de conformité : ${complianceConstraint}
- Classement initial des GED recommandées : ${recommendations}

Générez une analyse d'expert approfondie et personnalisée en français.
Votre analyse doit comporter les sections suivantes :
1. Analyse stratégique du contexte : Évaluation de leur situation par rapport à leur secteur (${industry}) et leur ERP (${erp}).
2. Justification des recommandations : Pourquoi ces logiciels spécifiques conviennent le mieux à leurs processus et volumes.
3. Guide d'intégration technique : Recommandations précises pour connecter la GED à leur ERP existant.
4. Conformité & Archivage : Solutions concrètes pour respecter les contraintes spécifiées (${complianceConstraint}).
5. Plan d'action : Les prochaines étapes recommandées pour mener à bien leur projet.

Consignes de formatage de l'e-mail :
- Renvoyez UNIQUEMENT le code HTML épuré et compatible e-mail pour le contenu de l'analyse.
- Utilisez des balises standard telles que <p>, <ul style="padding-left:20px;margin:8px 0;color:#cbd5e1;">, <li style="margin-bottom:6px;">, <strong style="color:#ffffff;"> et des sous-titres <h3 style="color:#60a5fa;font-size:15px;font-weight:700;margin-top:24px;margin-bottom:8px;">.
- Ne mettez AUCUN en-tête HTML global (comme <html>, <body>, <head>), commencez directement par le contenu intérieur.
- N'utilisez pas de blocs de code ou de balises markdown pour le style. Renvoyez uniquement du texte formaté en HTML.
- Soyez extrêmement professionnel, encourageant et exhaustif.`;
    }

    let geminiAnalysis = "";
    try {
      const generateContentWithRetry = async (promptText: string) => {
        const models = ["gemini-3.5-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
        let lastError: any = null;

        for (const model of models) {
          let attempt = 0;
          const maxRetries = 3; // Retry up to 3 times per model (4 attempts total)
          const initialDelayMs = 1500; // Increased initial delay slightly

          while (attempt <= maxRetries) {
            try {
              console.log(`Attempting Gemini generation using model: ${model} (Attempt ${attempt + 1}/${maxRetries + 1})`);
              return await ai.models.generateContent({
                model: model,
                contents: promptText,
              });
            } catch (error: any) {
              lastError = error;
              attempt++;
              
              const errorMessage = error?.message || "";
              const errorStatus = error?.status || 0;
              const errorStr = typeof error === 'object' ? JSON.stringify(error) : String(error);
              
              const isRetryable = errorStatus === 503 || errorStatus === 429 || 
                                  errorMessage.includes("503") || errorMessage.includes("429") || 
                                  errorStr.includes("503") || errorStr.includes("429") ||
                                  errorMessage.toLowerCase().includes("demand") || errorMessage.toLowerCase().includes("temporary") ||
                                  errorMessage.toLowerCase().includes("unavailable") || errorMessage.toLowerCase().includes("busy") ||
                                  errorMessage.toLowerCase().includes("overloaded") || errorMessage.toLowerCase().includes("limit") ||
                                  errorStr.toLowerCase().includes("demand") || errorStr.toLowerCase().includes("temporary") ||
                                  errorStr.toLowerCase().includes("unavailable") || errorStr.toLowerCase().includes("busy") ||
                                  errorStr.toLowerCase().includes("overloaded") || errorStr.toLowerCase().includes("limit");
              
              if (attempt > maxRetries || !isRetryable) {
                console.warn(`Model ${model} failed with non-retryable error or ran out of attempts. Error: ${errorMessage || errorStr}`);
                break;
              }
              
              // Exponential backoff with randomized jitter to prevent thundering herd issues
              const delay = (initialDelayMs * Math.pow(2, attempt - 1)) + Math.floor(Math.random() * 1500);
              console.warn(`Gemini API busy/unavailable with ${model}. Retrying in ${delay}ms... Reason: ${errorMessage || errorStr}`);
              await new Promise(resolve => setTimeout(resolve, delay));
            }
          }
        }
        throw lastError || new Error("All models failed to generate content.");
      };

      const response = await generateContentWithRetry(prompt);

      let text = response.text || "";
      if (text.includes("```html")) {
        text = text.split("```html")[1].split("```")[0];
      } else if (text.includes("```")) {
        text = text.split("```")[1].split("```")[0];
      }
      geminiAnalysis = text.trim();
    } catch (geminiError: any) {
      console.error("Gemini Generation Error:", geminiError);
      
      if (userLang === "ES") {
        geminiAnalysis = `<p>Nuestro consultor de IA encontró un error al generar el análisis personalizado avanzado. Sin embargo, nuestras recomendaciones básicas siguen siendo totalmente válidas.</p>
                          <p style="color: #ef4444; font-size: 12px;">Detalles: ${geminiError?.message || geminiError}</p>`;
      } else if (userLang === "EN") {
        geminiAnalysis = `<p>Our AI consultant encountered an error while generating the advanced personalized analysis. However, our basic recommendations remain fully valid.</p>
                          <p style="color: #ef4444; font-size: 12px;">Details: ${geminiError?.message || geminiError}</p>`;
      } else {
        geminiAnalysis = `<p>Notre consultant IA a rencontré une erreur lors de la génération de l'analyse personnalisée avancée. Cependant, nos recommandations de base restent pleinement valables.</p>
                          <p style="color: #ef4444; font-size: 12px;">Détails : ${geminiError?.message || geminiError}</p>`;
      }
    }

    // Localize email static labels & layout headers
    let labels = {
      subject: "Documatch CONTEXT – Analyse complète",
      titleSpan: "Analyse Personnalisée & Recommandations GED",
      profileHeader: "Profil de votre Entreprise",
      compName: "Entreprise",
      compEmail: "Email professionnel",
      compPhone: "Téléphone",
      compCountry: "Pays",
      compIndustry: "Secteur d'activité",
      compVolume: "Volume de documents",
      compUsersBudget: "Utilisateurs / Budget",
      compUsersSuffix: "ut.",
      compErp: "Système ERP actuel",
      compProcesses: "Processus clés",
      compConstraints: "Contraintes réglementaires",
      recHeader: "Top Recommandations Logiciels GED",
      analysisHeader: "Analyse d'Expert – Documatch CONTEXT",
      footerCopyright: "Cet email a été envoyé via Documatch CONTEXT. &copy; 2026 Documatch. Tous droits réservés.",
      footerIndependent: "Analyse 100% indépendante et personnalisée."
    };

    if (userLang === "ES") {
      labels = {
        subject: "Documatch CONTEXT – Análisis completo",
        titleSpan: "Análisis Personalizado & Recomendaciones GED",
        profileHeader: "Perfil de su Empresa",
        compName: "Empresa",
        compEmail: "Email profesional",
        compPhone: "Teléfono",
        compCountry: "País",
        compIndustry: "Sector de actividad",
        compVolume: "Volumen de documentos",
        compUsersBudget: "Usuarios / Presupuesto",
        compUsersSuffix: "us.",
        compErp: "Sistema ERP actual",
        compProcesses: "Procesos clave",
        compConstraints: "Restricciones regulatorias",
        recHeader: "Top Recomendaciones Software GED",
        analysisHeader: "Análisis de Experto – Documatch CONTEXT",
        footerCopyright: "Este correo electrónico fue enviado a través de Documatch CONTEXT. &copy; 2026 Documatch. Todos los derechos reservados.",
        footerIndependent: "Análisis 100% independiente y personalizado."
      };
    } else if (userLang === "EN") {
      labels = {
        subject: "Documatch CONTEXT – Complete Analysis",
        titleSpan: "Personalized Analysis & DMS Recommendations",
        profileHeader: "Your Company Profile",
        compName: "Company",
        compEmail: "Business Email",
        compPhone: "Phone",
        compCountry: "Country",
        compIndustry: "Industry",
        compVolume: "Document Volume",
        compUsersBudget: "Users / Budget",
        compUsersSuffix: "users",
        compErp: "Current ERP System",
        compProcesses: "Key Processes",
        compConstraints: "Regulatory Constraints",
        recHeader: "Top Recommended DMS Software",
        analysisHeader: "Expert Analysis – Documatch CONTEXT",
        footerCopyright: "This email was sent via Documatch CONTEXT. &copy; 2026 Documatch. All rights reserved.",
        footerIndependent: "100% independent and personalized analysis."
      };
    }

    // Build the complete, beautifully styled, responsive HTML report
    const htmlReport = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${labels.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#090d16;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e2e8f0;padding:40px 20px;">
  <div style="max-width:650px;margin:0 auto;background-color:#0f172a;border-radius:16px;border:1px solid #1e293b;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);">
    
    <!-- Header -->
    <div style="padding:32px;background:linear-gradient(135deg, #1e293b, #0f172a);border-bottom:1px solid #1e293b;text-align:center;">
      <h1 style="margin:0;font-size:24px;font-weight:800;color:#3b82f6;letter-spacing:-0.025em;text-transform:uppercase;">Documatch <span style="color:#ffffff;">CONTEXT</span></h1>
      <p style="margin:8px 0 0 0;font-size:12px;color:#94a3b8;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;">${labels.titleSpan}</p>
    </div>

    <!-- User Profile Summary Table -->
    <div style="padding:32px 32px 20px 32px;">
      <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#f8fafc;border-left:4px solid #3b82f6;padding-left:12px;">${labels.profileHeader}</h2>
      
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px;">
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;width:40%;">${labels.compName}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${companyName || 'Documatch Guest'}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compEmail}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${email}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compPhone}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${phone || '-'}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compCountry}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${country || '-'}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compIndustry}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${industry}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compVolume}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${volume}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compUsersBudget}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${usersCount} ${labels.compUsersSuffix} / ${allocatedBudget} €</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compErp}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;">${erp}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compProcesses}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;max-width:300px;word-break:break-word;">${processes}</td>
        </tr>
        <tr style="border-bottom:1px solid #1e293b;">
          <td style="padding:8px 0;color:#94a3b8;font-weight:500;">${labels.compConstraints}</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:700;text-align:right;max-width:300px;word-break:break-word;">${complianceConstraint}</td>
        </tr>
      </table>
    </div>

    <!-- Recommendations Section -->
    <div style="padding:0 32px 20px 32px;">
      <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#f8fafc;border-left:4px solid #10b981;padding-left:12px;">${labels.recHeader}</h2>
      <div style="background-color:#090d16;padding:16px;border-radius:12px;border:1px solid #1e293b;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#e2e8f0;line-height:1.6;">${recommendations}</p>
      </div>
    </div>

    <!-- Gemini AI Analysis Section -->
    <div style="padding:0 32px 32px 32px;border-top:1px solid #1e293b;padding-top:32px;">
      <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#f8fafc;border-left:4px solid #f59e0b;padding-left:12px;">${labels.analysisHeader}</h2>
      <div style="font-size:14px;color:#cbd5e1;line-height:1.7;">
        ${geminiAnalysis}
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:24px;background-color:#090d16;border-top:1px solid #1e293b;text-align:center;font-size:11px;color:#64748b;">
      <p style="margin:0;">${labels.footerCopyright}</p>
      <p style="margin:8px 0 0 0;">${labels.footerIndependent}</p>
    </div>

  </div>
</body>
</html>
    `.trim();

    console.log(`Sending email via Resend to ${email}`);

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not defined in the environment secrets.");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Documatch CONTEXT <onboarding@resend.dev>",
        to: email,
        subject: labels.subject,
        html: htmlReport
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      throw new Error(`Resend API response error (${resendResponse.status}): ${errorText}`);
    }

    const resendData = await resendResponse.json();
    console.log(`Resend Email Sent Successfully! ID:`, resendData.id);

    return res.json({ success: true, id: resendData.id });
  } catch (error: any) {
    console.error("Error in /api/analyze-and-send:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Vite server setup logic
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
