import jwt from "jsonwebtoken";

export function generateToken(data, role) {
  const genToken = { data, role };
  return jwt.sign({ genToken }, process.env.SECRET_TOKEN || "1234", {
    expiresIn: "2 days"
  });
}

export function whoAmi(request) {
  const header = request.get("authorization");

  if (!header) {
    throw new Error("Authentication required");
  }

  const token = header.replace("Bearer ", "");
  const data = jwt.verify(token, process.env.SECRET_TOKEN || "1234");
  return data;
}

export function isAdmin(request) {
  return whoAmi(request).genToken.role.nombre === "ADMIN";
}

export async function roleInformation(userId, ctx) {
  const typeUser = await ctx.prisma.user
    .findOne({
      where: {
        id: Number(userId)
      }
    })
    .tipo_usuario();

  return typeUser;
}
