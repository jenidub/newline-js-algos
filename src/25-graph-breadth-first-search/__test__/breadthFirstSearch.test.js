import Graph from '../../08-graph/Graph';
import GraphVertex from '../../08-graph/GraphVertex';
import GraphEdge from '../../08-graph/GraphEdge';
import { breadthFirstSearch } from '../breadthFirstSearch';

describe('breadthFirstSearch', () => {
  it('should perform BFS operation on graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');
    const vertexE = new GraphVertex('E');
    const vertexF = new GraphVertex('F');
    const vertexG = new GraphVertex('G');
    const vertexH = new GraphVertex('H');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCG = new GraphEdge(vertexC, vertexG);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeAE = new GraphEdge(vertexA, vertexE);
    const edgeEF = new GraphEdge(vertexE, vertexF);
    const edgeFD = new GraphEdge(vertexF, vertexD);
    const edgeDH = new GraphEdge(vertexD, vertexH);
    const edgeGH = new GraphEdge(vertexG, vertexH);

    graph
      .addEdge(edgeAB)
      .addEdge(edgeBC)
      .addEdge(edgeCG)
      .addEdge(edgeAD)
      .addEdge(edgeAE)
      .addEdge(edgeEF)
      .addEdge(edgeFD)
      .addEdge(edgeDH)
      .addEdge(edgeGH);

    expect(graph.toString()).toBe('A,B,C,G,D,E,F,H');

    const enterVertexCallback = jest.fn();

    breadthFirstSearch(graph, vertexA, enterVertexCallback);

    expect(enterVertexCallback).toHaveBeenCalledTimes(8);

    const enterVertexParamsMap = [
      vertexA,
      vertexB,
      vertexD,
      vertexE,
      vertexC,
      vertexH,
      vertexF,
      vertexG,
    ];

    for (let callIndex = 0; callIndex < graph.getAllVertices().length; callIndex += 1) {
      const param = enterVertexCallback.mock.calls[callIndex][0];
      expect(param).toEqual(enterVertexParamsMap[callIndex]);
    }
  });

  it('should make sure that code example works as expected', () => {
    // Create a demo-version of our overly-simplified social network.
    const socialNetwork = new Graph();

    // Let's register several users in our network.
    const bill = new GraphVertex('Bill');
    const alice = new GraphVertex('Alice');
    const john = new GraphVertex('John');
    const kate = new GraphVertex('Kate');
    const ann = new GraphVertex('Ann');
    const tom = new GraphVertex('Tom');
    const sam = new GraphVertex('Sam');

    // Now let's establish friendship connections between the users of our network.
    socialNetwork
      .addEdge(new GraphEdge(bill, alice))
      .addEdge(new GraphEdge(bill, john))
      .addEdge(new GraphEdge(bill, kate))
      .addEdge(new GraphEdge(alice, ann))
      .addEdge(new GraphEdge(ann, sam))
      .addEdge(new GraphEdge(john, ann))
      .addEdge(new GraphEdge(kate, tom));

    // Now let's traverse the network in breadth-first manner staring from Bill
    // and add all users we will encounter to the userVisits array.
    const userVisits = [];
    breadthFirstSearch(socialNetwork, bill, (user) => {
      userVisits.push(user);
    });

    expect(userVisits).toEqual([bill, alice, john, kate, ann, tom, sam]);
  });
});
