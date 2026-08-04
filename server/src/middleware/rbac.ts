/**
 * GeoVoto - Middleware de RBAC e Escopo Geográfico (Row-Level Security)
 * Berlim Co.
 */

import { Request, Response, NextFunction } from 'express';
import { Usuario, EscopoGeografico } from '../types';

// Extende a interface Request para anexar o usuário autenticado
export interface RequestComUsuario extends Request {
  usuario?: Usuario;
}

/** Usuários de demonstração por papel com escopos geográficos delimitados */
export const USUARIOS_DEMO: Usuario[] = [
  {
    id: 999,
    nome: 'Berlim Gestão',
    email: 'berlim.gestao@campanha.com.br',
    papel: 'gestao_master',
    escopo_geografico: { uf: 'PE' },
    dados_limpos: true,
    ativo: true,
  },
  {
    id: 1,
    nome: 'Carlos Eduardo',
    email: 'carlos@campanha.com.br',
    papel: 'responsavel_campanha',
    escopo_geografico: { uf: 'PE' }, // Acesso irrestrito a todo o estado de PE
    ativo: true,
  },
  {
    id: 2,
    nome: 'Mariana Silva',
    email: 'mariana.rmr@campanha.com.br',
    papel: 'coordenador_regional',
    escopo_geografico: { uf: 'PE', mesorregioes: ['Região Metropolitana do Recife'] },
    ativo: true,
  },
  {
    id: 3,
    nome: 'João Pedro',
    email: 'joao.agreste@campanha.com.br',
    papel: 'coordenador_regional',
    escopo_geografico: { uf: 'PE', mesorregioes: ['Agreste'] },
    ativo: true,
  },
];

/**
 * Middleware para anexar o contexto do usuário à requisição (via cabeçalho 'X-User-Role' ou 'X-User-Email')
 */
export function middlewareAnexarUsuario(req: RequestComUsuario, _res: Response, next: NextFunction): void {
  const userEmail = (req.headers['x-user-email'] as string) || 'carlos@campanha.com.br';
  const usuarioEncontrado = USUARIOS_DEMO.find((u) => u.email === userEmail) || USUARIOS_DEMO[0];
  req.usuario = usuarioEncontrado;
  next();
}

/**
 * Middleware para verificar autorização e aplicar filtro geográfico backend
 */
export function aplicarEscopoGeografico(req: RequestComUsuario, res: Response, next: NextFunction): void {
  if (!req.usuario) {
    res.status(401).json({ error: 'Usuário não autenticado' });
    return;
  }

  // Anexa o escopo do usuário para consumo nas rotas
  (req as unknown as { escopoGeografico: EscopoGeografico }).escopoGeografico = req.usuario.escopo_geografico;
  next();
}
