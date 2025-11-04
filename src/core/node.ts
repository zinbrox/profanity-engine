export class Node {
    children: Record<string, Node> = {};
    fail: Node | null = null;
    output: string[] = [];
}